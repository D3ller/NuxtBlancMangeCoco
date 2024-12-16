import {Server} from "socket.io";

export const setupWebSockets = (server) => {
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
    });

    return io;
};

