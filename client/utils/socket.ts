import { io } from 'socket.io-client';

const socket = io('http://172.20.10.2:6060');

export default socket;