// socket.js
import { io } from 'socket.io-client';

const socket = io('https://eventop-backend.onrender.com'); // URL del servidor backend

socket.on('connect', () => {
  console.log('Conectado al servidor de Socket.IO');
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor de Socket.IO');
});

export default socket;