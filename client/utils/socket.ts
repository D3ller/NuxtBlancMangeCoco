import { io } from 'socket.io-client';

const socket = io('http://192.168.0.1:6060');

export default socket;