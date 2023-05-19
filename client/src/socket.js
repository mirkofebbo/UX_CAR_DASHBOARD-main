import { io } from 'socket.io-client';


const socket = io('localhost:3000'); // Replace 'localhost:3000' with your server's address if needed

export default socket;
