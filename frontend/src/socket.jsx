//src/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://my-api-app-19.onrender.com'
const socket = io(SOCKET_URL);
export default socket;
