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
        let whiteCards = await WhiteCardMongoose.find();
        let blueCards = await BlueCardMongoose.find();

        if (whiteCards.length === 0 || blueCards.length === 0) {
            throw new Error('Il n\'y a pas assez de cartes disponibles pour distribuer.');
        }

        // distrib cartes blueus
        const randomBlueIndex = Math.floor(Math.random() * blueCards.length);
        const selectedBlueCard = blueCards[randomBlueIndex];
        currentRoom.blueCard = selectedBlueCard;
        blueCards.splice(randomBlueIndex, 1);

        // ditrib cartes blanches
        currentRoom.users.forEach(user => {
            const cardsToAdd = 6 - user.cards.length;

            let addedCards = 0;
            while (addedCards < cardsToAdd) {
                if (whiteCards.length === 0) {
                    throw new Error('Plus de cartes blanches disponibles.');
                }

                const randomWhiteIndex = Math.floor(Math.random() * whiteCards.length);
                const selectedWhiteCard = whiteCards[randomWhiteIndex];

                // 🔥 Vérifie NSFW avant d'ajouter
                if (!selectedWhiteCard.nsfw) {
                    user.cards.push(selectedWhiteCard);
                    whiteCards.splice(randomWhiteIndex, 1);
                    addedCards++;
                }
            }
        });

        // Marquer les modifications pour Mongoose
        currentRoom.markModified('users');
        currentRoom.markModified('blueCard');

        console.log('Cartes distribuées avec succès.');
        await currentRoom.save(); // S'assurer que la room est bien sauvegardée

        return currentRoom;
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

// kick un joueur inactif depuis 2min

const playerActivity = new Map();
// const PLAYER_INACTIVITY_LIMIT = 120000;
const PLAYER_INACTIVITY_LIMIT = 10000;

function resetPlayerActivity(roomName, socketId, io) {
    const playerKey = `${roomName}:${socketId}`;

    // Supprimer l'ancien timer s'il existe
    if (playerActivity.has(playerKey)) {
        clearTimeout(playerActivity.get(playerKey).timer);
    }

    // Créer un nouveau timer d'expulsion
    const timer = setTimeout(async () => {
        await connectDb();
        let room = await RoomMongoose.findOne({ name: roomName });

        if (!room) return;

        // Trouver l'utilisateur dans la room
        let userIndex = room.users.findIndex(user => user.socketId === socketId);

        if (userIndex !== -1) {
            console.log(`Expulsion du joueur inactif ${room.users[userIndex].username}`);

            // Supprimer le joueur inactif de la room
            room.users.splice(userIndex, 1);
            await room.save();

            // Informer le joueur et les autres de son expulsion
            io.to(socketId).emit('kick')
            io.to(roomName).emit('roomUpdate', room);
        }

        playerActivity.delete(playerKey);

    }, PLAYER_INACTIVITY_LIMIT);

    // Stocker le nouveau timer
    playerActivity.set(playerKey, { lastRequest: Date.now(), timer });
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
            let rooms = await RoomMongoose.find();

            io.emit('rooms', rooms);

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

            resetRoomActivity(roomName, io)
            resetPlayerActivity(roomName, socket.id, io)

            let currentRoom = await RoomMongoose.findOne({ name: roomName });
            let rooms = await RoomMongoose.find();

            io.emit('rooms', rooms);

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
            resetPlayerActivity(roomName, socket.id, io)

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            socket.emit('rooms', currentRoom);

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

            if (!currentRoom) {
                return
            }

            await currentRoom.save()

        })

        socket.on('choose-card', async (roomName, room, cardChoosed) => {
            await connectDb()
            resetPlayerActivity(roomName, socket.id, io)

            let currentRoom = await RoomMongoose.findOne({ name: roomName });

            if (!currentRoom) {
                return
            }

            const user = currentRoom.users.find(user => user.username === room.username);

            if (!user) {
                return
            }

            const cardIndex = user.cards.findIndex(card => card._id.toString() === cardChoosed._id.toString());

            if (cardIndex === -1) {
                console.error("Carte non trouvée dans le deck du joueur !");
                return;
            }

            const [removedCard] = user.cards.splice(cardIndex, 1);

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
            resetPlayerActivity(roomName, socket.id, io)

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

            currentRoom.blueCard = null
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
            io.to(`TV_${roomName}`).emit('winner', winner)
            io.to(`TV_${roomName}`).to(roomName).emit('turn', currentRoom)
        })

        socket.on('quit', async (user, room, cb) => {
            await connectDb();

            let currentRoom = await RoomMongoose.findOne({ name: room.name });
            if (!currentRoom) return;

            // Trouver l'utilisateur dans la room actuelle
            let currentUser = currentRoom.users.find(u => u.username === user.username);
            if (!currentUser) return;

            let rooms = await RoomMongoose.find();

            io.emit('rooms', rooms);

            // Supprime le joueur de la liste des utilisateurs
            currentRoom.users = currentRoom.users.filter(u => u.username !== user.username);

            // Si le leader quitte, attribuer un nouveau leader
            if (user.role === "leader" && currentRoom.users.length > 0) {
                currentRoom.users[0].role = "leader";
                console.log(`New leader assigned: ${currentRoom.users[0].username}`);

                currentRoom.answers = [];
                // currentRoom.answers = currentRoom.answers.filter(answer =>
                //     answer.id.toString() !== currentRoom.users[0]._id.toString()
                // );
            }

            // Supprimer la réponse de l'ancien joueur
            currentRoom.answers = currentRoom.answers.filter(answer =>
                answer.id.toString() !== currentUser._id.toString()
            );

            // Si moins de 3 joueurs, mettre la salle en attente et vider les réponses
            if (currentRoom.users.length < 3) {
                currentRoom.status = 'waiting';
                currentRoom.answers = [];
            }

            console.log(currentRoom);

            // Sauvegarder les changements
            await currentRoom.save();

            // Mettre à jour la room pour tous les joueurs connectés
            // io.to(room.name).emit('playerUpdate', currentUser);
            io.to(room.name).emit('turn', currentRoom);
            io.to(`TV_${room.name}`).to(room.name).emit('roomUpdate', currentRoom);

            console.log(`User ${user.username} left the room ${currentRoom.name}`);

            cb({
                success: true,
                message: 'USER HAS BEEN REMOVED'
            });
        });

    });

    return io;
};

