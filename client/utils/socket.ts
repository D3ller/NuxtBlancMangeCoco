import { io } from 'socket.io-client';

const socket = io('http://10.152.5.52:6060');

export default socket;