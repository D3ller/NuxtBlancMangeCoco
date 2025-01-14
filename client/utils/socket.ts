import {io} from 'socket.io-client';

const socket = io('http://10.152.10.51:6060');

export default socket;