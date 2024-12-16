import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import {setupWebSockets} from './websocket.ts';
import {rooms} from "./utils";

const app = express();
const server = createServer(app);

const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Le serveur marche');
});

app.get('/room', (req, res) => {
  res.send(rooms);
})

setupWebSockets(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
