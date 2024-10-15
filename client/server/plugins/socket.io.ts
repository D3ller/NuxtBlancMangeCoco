import type { NitroApp } from 'nitropack'
import { Server as Engine } from 'engine.io'
import type { Socket } from 'socket.io'
import { Server } from 'socket.io'
import { defineEventHandler } from 'h3'
import socketServer from '~/lib/socket'

export default defineNitroPlugin((nitroApp: NitroApp) => {
    const engine = new Engine()
    socketServer.io = new Server()

    socketServer.io.bind(engine)

    socketServer.io.on('connection', (socket: Socket) => {

        socket.emit('id', socket.id)

        socket.on('create-room', async (e) => {
            console.log(e)
            socket.data.name = "test"
            socket.data.userId = 123
            socket.join(e)
            console.log(socket.rooms)
            socket.emit('room-created', e)
        })

        socket.on('join-room', async (e) => {
            const clients = socketServer.io.sockets.adapter.rooms.get(e)
            const allRooms = socketServer.io?.sockets?.adapter.rooms;
            const sockets = await socketServer.io.fetchSockets();
            console.log(sockets[0].data.name, sockets[0].data.userId)
        })

        socket.on('getPlayers', (e, callback) =>{
            const clients = socketServer.io.sockets.adapter.rooms.get(e)

            let client = [];
            clients.forEach((e) => {
                client.push(e)
            })
            callback({client: client})

        })

        socket.on('selectCard', (e) => {
            console.log("le joeur a select la carte ", e)
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
