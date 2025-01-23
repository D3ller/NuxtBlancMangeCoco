import {Server} from "socket.io";
import {addRoom, getRoomAvaible, Room, rooms, RoomStatus, User, UserRoles} from "./utils";
import {Messages} from "./utils/message.ts";
import bannedWords from './utils/bannedWord.json';

export const setupWebSockets = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.on("connection", (socket) => {
        socket.emit('id', socket.id);

        socket.on('disconnect', () => {
            console.log(`Déconnecté: ${socket.id}`);
        });

        socket.on('get-players', (roomName: string, callback) => {
            let currentRoom = rooms.find(room => room.name === roomName);
            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            let players = currentRoom.users.find((b) => b.socketId === socket.id);

            callback({
                success: true,
                players: currentRoom.getRoom(),
                currentPlayers: players
            })
        })


        socket.on('create-server', (roomName: string, callback) => {
            if (Room.isRoomExist(roomName)) {
                callback({
                    success: false,
                    message: Messages.ROOM_ALREADY_EXIST
                })
                return;
            }

            const room: Room = new Room(roomName, Room.generateRoomId(), new User("TV", 1, UserRoles.TV, socket.id));
            addRoom(room);
            socket.join(roomName);
            io.emit('rooms', getRoomAvaible());
            callback({
                success: true,
                message: Messages.ROOM_CREATED,
                room: room
            })

        })

        socket.on('confirm-card', (socket: string, roomName: string, callback) => {
            let currentRoom = rooms.find(room => room.name === roomName);
            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            console.log(socket)

            let user = currentRoom.users.find(user => user.socketId === socket);
            if (!user) {
                return callback({
                    success: false,
                    message: Messages.USER_NOT_FOUND
                })
            }

            console.log(user.hand);

            currentRoom.users.forEach((e) => {
                if (e.role != UserRoles.TV) {
                    e.role = UserRoles.USER;
                    e.deleteCardFromDeck(0)
                }

                if (e.hand === user.hand) {
                    console.log('username gagnant: ', user.username);
                    user.win++;
                    console.log('user wins: ', user.win);
                    io.to(user?.socketId).emit('win-turn')
                    user.role = UserRoles.LEADER;
                }
                // {
                //     success: true,
                //     players: currentRoom.getRoom(),
                //     currentPlayers: e
                // }
            })

            currentRoom.users.forEach((e) => {
                io.to(e.socketId).emit("turn", {
                    success: true,
                    players: currentRoom.getRoom(),
                    currentPlayers: e
                })
            })


            // {
            //     success: true,
            //     players: currentRoom.getRoom(),
            //     currentPlayers: players
            // }
        })

        socket.on('next-turn', (roomName, cb) => {
            let currentRoom = rooms.find(room => room.name === roomName);

            if (!currentRoom) {
                return cb({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            currentRoom.distributeCards();

            currentRoom.users.forEach(user => {
                if (user.role === UserRoles.TV) {
                    io.to(user.socketId).emit('blue-card', currentRoom.currentCard);
                    return
                }
                if (user.role === UserRoles.LEADER) return;
                io.to(user.socketId).emit('cards', user.cards);
            })

            return cb({
                currentRoom
            })
        })

        socket.on('join-server', (roomName: string, username: string, callback) => {
            let currentRoom = rooms.find(room => room.name === roomName);

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

            if (currentRoom.isUserExist(username)) {
                return callback({
                    success: false,
                    message: Messages.USERNAME_ALREADY_TAKEN
                })
            }

            let role = currentRoom.users.length === 1 ? UserRoles.LEADER : UserRoles.USER;
            let user = new User(username, currentRoom.users.length + 1, role, socket.id);
            currentRoom.addUser(user);
            socket.join(roomName);
            io.emit('rooms', getRoomAvaible());
            io.to(roomName).emit('room-update', currentRoom);
            callback({
                success: true,
                message: "Vous avez rejoint la salle avec succès.",
                user: user,
                players: currentRoom.getRoom()
            })

        })

        socket.on('start-game', (roomName: string, callback) => {

            socket.emit('id', socket.id);


            let currentRoom = rooms.find(room => room.name === roomName);
            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }
            const leader = currentRoom.users.find(user => user.role === UserRoles.LEADER);
            if (!leader || leader.socketId !== socket.id) {
                return callback({
                    success: false,
                    message: Messages.NOT_LEADER,
                    leader: leader
                })
            }

            if (currentRoom.users.length - 3 < 1) {
                return callback({
                    success: false,
                    message: Messages.ROOM_TOO_SMALL
                })
            }

            if (currentRoom.status === RoomStatus.STARTED) {
                return callback({
                    success: false,
                    message: Messages.ALREADY_STARTED
                })
            }

            currentRoom.status = RoomStatus.STARTED;
            io.emit('rooms', getRoomAvaible());
            currentRoom.distributeCards();
            io.to(roomName).emit('game-started', currentRoom);

            currentRoom.users.forEach(user => {
                if (user.role === UserRoles.TV) {
                    io.to(user.socketId).emit('blue-card', currentRoom.currentCard);
                    return
                }
                if (user.role === UserRoles.LEADER) return;
                io.to(user.socketId).emit('cards', user.cards);
            })

            callback({
                success: true,
                message: "La partie a commencé."
            })
        })

        socket.on('get-rooms', (callback) => {
            callback(getRoomAvaible());
        })

        socket.on('choose-card', async (roomName: string, index: number, callback) => {

            let currentRoom = rooms.find(room => room.name === roomName);
            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            let user = currentRoom.users.find(user => user.socketId === socket.id);
            if (!user) {
                return callback({
                    success: false,
                    message: Messages.USER_NOT_FOUND
                })
            }

            user.setHandCard(index);

            let tv = currentRoom.users.find(user => user.role === UserRoles.TV)
            let leader = currentRoom.users.find((u) => u.role === UserRoles.LEADER);
            if (tv && leader) {
                if (currentRoom.countAnswer()) {
                    io.to(tv?.socketId).emit('tv', 'tt le monde a joue')

                    let white_cards: string[] = []

                    currentRoom.users.forEach(async (e) => {
                        if (e.role === UserRoles.TV || e.role === UserRoles.LEADER) {
                            return;
                        }
                        e.cards[0] = {...e.cards[0], socketId: e.socketId};
                        white_cards.push(e.cards[0])
                    })

                    io.to(tv?.socketId).emit('white_cards', white_cards);

                    io.to(leader?.socketId).emit("final-choice", white_cards);

                } else {
                    io.to(tv?.socketId).emit('tv', 'ceci est la tele')
                }
            } else {
                console.log("nnaaaan")
            }
        })

        socket.on('cardPosition', (index: number, roomName: string, callback) => {
            let currentRoom = rooms.find(room => room.name === roomName);
            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            let tv = currentRoom.users.find((b) => b.role === UserRoles.TV);
            if (tv) {
                io.to(tv.socketId).emit('updateCardPosition', index);
            }
        })

        socket.on('leave-room', (roomName: string, callback) => {
            let currentRoom = rooms.find(room => room.name === roomName);
            if (!currentRoom) {
                return callback({
                    success: false,
                    message: Messages.ROOM_NOT_FOUND
                })
            }

            let user = currentRoom.users.find(user => user.socketId === socket.id);
            if (!user) {
                return callback({
                    success: false,
                    message: Messages.USER_NOT_FOUND
                })
            }

            currentRoom.RemoveUser(user);

            io.to(roomName).emit('room-update', currentRoom);
            callback({
                success: true,
                message: Messages.ROOM_LEFT
            })
        })
    });

    return io;
};

