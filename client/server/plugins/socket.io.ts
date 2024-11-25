import type {NitroApp} from 'nitropack'
import {Server as Engine} from 'engine.io'
import {Server, Socket} from 'socket.io'
import {defineEventHandler} from 'h3'
import socketServer from '~/lib/socket'

export default defineNitroPlugin((nitroApp: NitroApp) => {

    const engine = new Engine()
    socketServer.io = new Server({
        pingTimeout: 0,
        pingInterval: 0,
    })
    socketServer.io.bind(engine)

    //interface à déplacer plus tard
    interface Room {
        id: string
        roomName: string
        status: string
        players: {
            id:string,
            username?:string,
        }[]
    }

    interface SocketUser extends Socket {
        username?:string
    }

    // en local pour le moment mais à voir si on ne met pas..
    // les rooms sous base de donnée
    let rooms :Room[] = []

    socketServer.io.on('connection', (socket: SocketUser) => {

        socket.username = "tv"

        socket.emit('id', socket.id)

        socket.on("disconnect", (reason) => {
            socket.emit('id', socket.id)
            console.log("disconnect", reason)
        });

        socket.on('create-server', (roomName, cb) => {
            const roomExists = rooms.find((e) => e.roomName === roomName);
            if (!roomExists) {
                const newRoom = {
                    id: "1",
                    roomName,
                    status: "waiting",
                    players: [{id: socket.id, username: socket.username, role: 'tv'}],
                };
                rooms.push(newRoom);

                socket.join(roomName);
                cb({
                    status: "room created",
                    data: {
                        rooms,
                        me: socket.id,
                        players: newRoom.players,
                    },
                });
            } else {
                cb({
                    status: "error",
                    message: "This room already exists, join them instead.",
                });
            }
        });


        socket.on('join-server', (roomName, username, cb) => {

            console.log(socket.id + " joined " + roomName)
            socket.emit('id', socket.id)

        let room = rooms.find((e) => e.roomName == roomName)

            if (!room) {
                cb({
                    status: "error",
                    message: "room does not exist"
                })
                return
            }

            if (room.status === "playing" || room.status === "finished") {
                cb({
                    status: "error",
                    message: "game already started"
                })
                return;
            }


            if (room.players.find((e) => e.username === username)) {
                cb({
                    status: "error",
                    message: "username already taken"
                })
                return;
            }

            let findTV = room.players.find((b) => b.username === 'tv');
            if (findTV && room.status === "waiting") {
                let findPartyist = room.players.find((b) => b?.role === 'partyist');
                if (findPartyist) {
                    room?.players.push({id: socket.id, username: username})
                } else {
                    room?.players.push({id: socket.id, username: username, role: 'partyist'})
                }
                // room?.players.push({id: socket.id, username: username})

            }







        socket.join(roomName)

            console.log(socket.id)

            socketServer.io?.emit("player-joined", {clients: room?.players})
            cb({
                status: "room joined",
                data: {
                    rooms,
                    me: socket.id,
                    players: room?.players
                }
            })


        // let party = rooms.find((e) => e.roomName === roomName)
        
        // if (party) {
        //     // Ajouter le joueur dans la salle
        //     party.players.push({id: socket.id, username: socket.username})
        //     socket.join(roomName)

        //     // Envoi de la liste des joueurs au nouveau joueur
        //     cb({
        //         rooms,
        //         me: socket.id,
        //         players: party.players  // Liste des joueurs dans la salle
        //     })

        //     // Notification à tous les autres joueurs de la salle qu'un nouveau joueur a rejoint
        //     socket.to(roomName).emit('player-joined', {
        //         id: socket.id,
        //         username: socket.username,
        //         players: party.players
        //     })
        // } else {
        //     socket.emit('error', "Room does not exist")
        // }
    })

    socket.on('get-players', (roomName, cb) => {

        const room = rooms.find((e) => e.roomName == roomName)
        if(!room) {
            cb({
                success: false,
                message: "room does not exist"
            })
            return
        }

        const roomWOrole = room.players.map((e) => {
            if(e.username === 'tv') return e
            delete e.role
            return e
        })
        //
        cb({
            clients: roomWOrole
        })
    })
})

    nitroApp.router.use(
        '/api/ws',
        defineEventHandler({
            handler(event) {
                engine.handleRequest(event.node.req, event.node.res)
                event._handled = true
                // @ts-expect-error
                event.node.req.context = event.context
            },
            websocket: {
                open(peer) {
                    const nodeContext = peer.ctx.node
                    const req = nodeContext.req

                    // @ts-expect-error private method
                    engine.prepare(req)

                    const rawSocket = nodeContext.req.socket
                    const websocket = nodeContext.ws

                    // @ts-expect-error private method
                    engine.onWebSocket(req, rawSocket, websocket)
                },
            },
        }),
    )
})
