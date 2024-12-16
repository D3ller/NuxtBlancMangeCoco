import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import {setupWebSockets} from './websocket.ts';

const app = express();
const server = createServer(app);

const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Le serveur marche');
});

setupWebSockets(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
