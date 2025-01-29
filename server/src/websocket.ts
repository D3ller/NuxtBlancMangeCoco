import { Server } from "socket.io";
import addRoom, { countAnswer, deleteCardFromDeck, deleteRoom, getRoomAvailable, Room, rooms, RoomStatus, setHandCard, User, UserRoles } from "./utils";
import { Messages } from "./utils/message.ts";
import bannedWords from './utils/bannedWord.json';
import mongoose, { Mongoose } from "mongoose";
import { RoomMongoose } from "./models/RoomsModel.ts";
import { WhiteCardMongoose } from "./models/WhiteCardModel.ts";
import { BlueCardMongoose } from "./models/BlueCardModel.ts";

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error()
    }
}

async function distributeCards(currentRoom) {
    try {
        // Récupérer les cartes disponibles
        let whiteCards = await WhiteCardMongoose.find();
        let blueCards = await BlueCardMongoose.find();

        // Vérifier s'il y a des cartes disponibles
        if (whiteCards.length === 0 || blueCards.length === 0) {
            throw new Error('Il n\'y a pas assez de cartes disponibles pour distribuer.');
        }

        // Distribuer une carte bleue à chaque utilisateur
        for (const user of currentRoom.users) {
            // Vérifier si les cartes bleues sont disponibles
            if (blueCards.length === 0) {
                throw new Error('Plus de cartes bleues disponibles.');
            }

            // Sélectionner une carte bleue aléatoire pour la room
            const randomBlueIndex = Math.floor(Math.random() * blueCards.length);
            const selectedBlueCard = blueCards[randomBlueIndex];

            // Retirer la carte bleue du deck
            blueCards.splice(randomBlueIndex, 1);

            // Ajouter la carte bleue à la room
            currentRoom.blueCard = selectedBlueCard;

            // Distribuer des cartes blanches aux utilisateurs
            const cardsToAdd = 11 - user.cards.length;  // Nombre de cartes blanches à distribuer pour atteindre 11 cartes

            for (let i = 0; i < cardsToAdd; i++) {
                if (whiteCards.length === 0) {
                    throw new Error('Plus de cartes blanches disponibles.');
                }

                // Sélectionner une carte blanche aléatoire
                const randomWhiteIndex = Math.floor(Math.random() * whiteCards.length);
                const selectedWhiteCard = whiteCards[randomWhiteIndex];

                // // Retirer la carte blanche du deck
                whiteCards.splice(randomWhiteIndex, 1);

                // Ajouter la carte blanche à l'utilisateur
                user.cards.push(selectedWhiteCard);
            }
        }

        // Mettre à jour la room dans la base de données avec les utilisateurs et leurs cartes
        currentRoom.users = currentRoom.users.map(user => ({
            ...user,
            cards: user.cards,
        }));

        // Sauvegarder la room mise à jour dans la base de données
        // await currentRoom.save();

        return await currentRoom

        console.log('Cartes distribuées avec succès.');
    } catch (error) {
        console.error('Erreur lors de la distribution des cartes:', error);
        throw error;
    }
}

// function pour que si la room n'est pas occupée depuis 5min elle est reset
// Map() sert à gerer des sortes d'etats, il peut donc comparer une ancienne variable avec une nouvelle
const roomActivity = new Map();
// 3 min d'inactivité avant expulsion
const INACTIVITY_LIMIT = 180000;

function resetRoomActivity(roomName, io) {
    if (roomActivity.has(roomName)) {
        clearTimeout(roomActivity.get(roomName).timer);
    }

    const timer = setTimeout(async () => {
        // deleteRoom(roomName);

        // for reset or delete the room

        await connectDb();
        let room = await RoomMongoose.findOne({ name: roomName });

        if (!room) return;

        if (room.name === 'IUT2TROYES') {
            room.status = "waiting";
            room.playerWon = "";
            room.answers = [];
            room.users = [];
            room.blueCard = null;

            await room.save()

            io.to(roomName).emit('kick')
            io.to(`TV_${roomName}`).emit('roomUpdate', room)
        } else {
            await io.to(roomName).to(`TV_${roomName}`).emit('kick')
            await room.deleteOne({ name: roomName });

        }

    }, INACTIVITY_LIMIT);

    roomActivity.set(roomName, { lastRequest: Date.now(), timer });
}

export const setupWebSockets = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.on("connection", (socket) => {

        socket.on('disconnect', () => {
            console.log(`Déconnecté: ${socket.id}`);
        });

        /**
         * Socket function to initailize the room for play
         * The room being create in the database for keep the datas if the socket has been disconnected
         */
        socket.on('create-server', async (roomName: string, callback) => {
            // if (await Room.isRoomExist(roomName)) {
            //     callback({
            //         success: false,
            //         message: Messages.ROOM_ALREADY_EXIST
            //     })
            //     return;
            // }

            await connectDb()

            let roomExists = await RoomMongoose.findOne({ name: roomName });

            resetRoomActivity(roomName, io);

            if (!roomExists) {

                // callback({
                //     success: false,
                //     message: 'ROOM ALREADY CREATED',
                //     room: roomExists
                // })

                // return

                // creation de la room dans la base de donnée
                const room = new RoomMongoose({
                    name: roomName,
                    status: RoomStatus.WAITING
                })

                await room.save()

                mongoose.disconnect()
                // io.emit('rooms', await getRoomAvailable());

                callback({
                    success: true,
                    message: Messages.ROOM_CREATED,
                    room: room
                })
            } else {
                callback({
                    success: false,
                    message: Messages.ROOM_CREATED
                })
            }


        })

        socket.on('getRooms', async (cb) => {
            // function pour récupérer toutes les rooms de la BDD

            await connectDb()

            let rooms = await RoomMongoose.find();

            cb({
                success: true,
                message: 'ROOM',
                rooms
            })
        })

        socket.on('getCurrentRoom', async (roomName, cb) => {
            // function pour récupérer la room en fonction de son nom

            await connectDb()

            let room = await RoomMongoose.findOne({ name: roomName });

            if (!room) {
                cb({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND,
                    room
                })
            }

            cb({
                success: true,
                message: 'ROOM',
                room
            })
        })

        socket.on('getCurrentPlayer', async (username, roomName, cb) => {
            await connectDb()

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            resetRoomActivity(roomName, io);

            if (!currentRoom) {
                return
            }

            const user = currentRoom.users.find(user => user.username === username);

            if (!user) {
                return
            }

            if (user.username == username) {

                socket.join(roomName)
                user.socketId = socket.id

                await currentRoom.save()

                cb({
                    success: true,
                    message: 'USER FOUND',
                    user
                })
            } else {
                cb({
                    success: false,
                    message: 'USER NOT FOUND'
                })
            }
        })

        socket.on('join-server', async (roomName, username, callback) => {
            await connectDb()

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            if (currentRoom?.status === (RoomStatus.STARTED || RoomStatus.ENDED)) {
                return callback({
                    success: false,
                    message: Messages.ROOM_ALREADY_STARTED
                })
            }

            if (currentRoom?.users.length >= 9) {
                return callback({
                    success: false,
                    message: Messages.ROOM_ALREADY_FULL
                })
            }

            const testBanned = username.toLowerCase().split(' ').join('');
            if (bannedWords.bannedWords.some(word => testBanned.includes(word))) {
                return callback({
                    success: false,
                    message: Messages.USERNAME_BANNED
                })
            }

            if (username.length < 3 || username.length > 10) {
                return callback({
                    success: false,
                    message: Messages.USERNAME_TOO
                })
            }

            // function problématique car elle faisait en sorte de bypass le filtre mis en place
            // pour fix ça on utilise "some()", qui ne retourne rien tant que le code n'est pas exécuté
            // je ne sais pas si avec une boucle for ça aurait pu marcher

            // currentRoom.users.forEach((user) => {
            //     if (user.username === username) {
            //         return callback({
            //             success: false,
            //             message: Messages.USERNAME_ALREADY_TAKEN
            //         })
            //     }
            // })

            // maintenant avant de passer à la suite on vérifie que le nom de l'utilisateur ne soit pas en double

            if (currentRoom.users.some(user => user.username === username)) {
                console.log('already in the room')
                return callback({
                    success: false,
                    message: Messages.USERNAME_ALREADY_TAKEN
                });
            }

            // initialisation du nouvel utilisateur
            const newUser = {
                _id: new mongoose.Types.ObjectId(),
                username,
                role: currentRoom.users.length <= 0 ? UserRoles.LEADER : UserRoles.USER,
                socketId: socket.id,
                cards: [],
                wins: 0
            }

            socket.join(roomName);

            currentRoom.users.push(newUser);

            await currentRoom.save();

            io.to(`TV_${roomName}`).to(roomName).emit('roomUpdate', currentRoom)

            callback({
                success: true,
                message: 'ROOM JOINED'
            })

        })

        socket.on('joinTvGroup', (roomName, callback) => {
            socket.join(`TV_${roomName}`);

            callback({
                success: true,
                message: 'ROOM JOINED'
            })
        })

        // --------------------- PARTIE GESTION DE LA GAME ----------------------- //

        socket.on('startGame', async (roomName, callback) => {
            await connectDb()

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            if (!currentRoom) {
                return
            }

            if (currentRoom.users.length < 3) {
                callback({
                    success: false,
                    message: 'pas assez de joueurs'
                })

                return
            }

            currentRoom.status = RoomStatus.STARTED

            currentRoom = await distributeCards(currentRoom)

            // console.log(currentRoom)

            io.to(`TV_${roomName}`).to(roomName).emit('roomUpdate', currentRoom)

            // await currentRoom.isModified()

            await currentRoom.save()

        })

        socket.on('choose-card', async (roomName, username, cardChoosed) => {
            await connectDb()

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            if (!currentRoom) {
                return
            }

            const user = currentRoom.users.find(user => user.username === username);

            if (!user) {
                return
            }

            let inCardUser = {
                id: user._id,
                socketId: user.socketId
            }

            currentRoom.answers.push({ ...cardChoosed, ...inCardUser })

            resetRoomActivity(roomName, io)

            if (currentRoom.answers.length == currentRoom?.users.length - 1) {
                io.to(`TV_${roomName}`).to(roomName).emit('answers', currentRoom)
                // io.to(`TV_${roomName}`).to(roomName).emit('roomUpdate', currentRoom)
            }

            await currentRoom.save()

        })

        socket.on('cardPosition', (cardPos, roomName) => {
            io.to(`TV_${roomName}`).emit('updatePos', cardPos)
        })

        socket.on('confirm', async (roomName, cardPos, cb) => {
            await connectDb()

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            if (!currentRoom || !currentRoom.answers[cardPos]) {
                console.error('Invalid room or answer position');
                return cb({ error: 'Invalid room or answer position' });
            }

            const answer = currentRoom.answers[cardPos];

            // Recherche de l'utilisateur correspondant
            const winner = currentRoom.users.find(user =>
                String(user._id) === String(answer.id)
            );

            if (!winner) {
                console.error('No matching user found for answer:', answer);
                return cb({ error: 'No matching user found' });
            }

            // console.log('Winner found:', winner);

            currentRoom.users.forEach(user => {
                user.role = UserRoles.USER
            })

            currentRoom.blueCard = ''
            currentRoom.answers = []

            // Incrémentation des victoires
            winner.wins += 1;
            winner.role = UserRoles.LEADER

            currentRoom = await distributeCards(currentRoom);

            currentRoom?.isModified()
            await currentRoom?.save()

            resetRoomActivity(roomName, io)

            cb({
                winner,
                currentRoom
            })

            // io.to(`TV_${roomName}`).to(roomName).emit('roomUpdate', currentRoom)
            io.to(roomName).emit('turn', currentRoom)
        })

        // fonction pour quitter le jeu proprement
        socket.on('quit', () => {

        })

    });

    return io;
};

