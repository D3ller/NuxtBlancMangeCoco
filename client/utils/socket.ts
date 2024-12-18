import { io } from 'socket.io-client';

const socket = io('http://10.152.3.181:6060');

export default socket;