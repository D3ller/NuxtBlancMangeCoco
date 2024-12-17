import {Server} from "socket.io";
import {addRoom, Room, rooms, RoomStatus, User, UserRoles} from "./utils";
import {Messages} from "./utils/message.ts";

export const setupWebSockets = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.on("connection", (socket) => {
        console.log(`Connecté: ${socket.id}`);
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
            callback({
                success: true,
                players: currentRoom.getRoom()
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
            callback({
                success: true,
                message: Messages.ROOM_CREATED,
                room: room
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

            if (currentRoom?.users.length >= 8) {
                return callback({
                    success: false,
                    message: Messages.ROOM_ALREADY_FULL
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
            console.log(socket.id);
            if (!leader || leader.socketId !== socket.id) {
                return callback({
                    success: false,
                    message: Messages.NOT_LEADER,
                    leader: leader
                })
            }

            if (currentRoom.users.length - 1 < 1) {
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
            currentRoom.distributeCards();
            io.to(roomName).emit('game-started', currentRoom);

            currentRoom.users.forEach(user => {
                if (user.role === UserRoles.TV) {
                    console.log(currentRoom.currentCard);
                    io.to(user.socketId).emit('blue-card', currentRoom.currentCard);
                    return
                }
                //if (user.role === UserRoles.LEADER) return;
                console.log(user.cards);
                io.to(user.socketId).emit('cards', user.cards);
            })

            callback({
                success: true,
                message: "La partie a commencé."
            })
        })

        socket.on('choose-card', (roomName: string, index: number, callback) => {

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

            let tv = currentRoom.users.find(user => user.role === UserRoles.TV)
            if (tv) {
                if(currentRoom.countAnswer()) {
                    io.to(tv?.socketId).emit('tv', 'tt le monde a joue')
                } else {
                    io.to(tv?.socketId).emit('tv', 'ceci est la tele')
                }
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

