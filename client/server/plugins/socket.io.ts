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
