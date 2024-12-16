import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Corrected cors configuration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Use an object with 'origin'
    methods: ['GET', 'POST','PUT']
  }
});

  export function getReciverId (userId){
      return socketUsersMap[userId];
  }

  const socketUsersMap = {};

io.on('connection', (socket) => {
  console.log('User connected', socket.id);  // Fixed typo from 'connetced' to 'connected'

  const userId = socket.handshake.query.userId;
  if(userId) {
    socketUsersMap[userId]=socket.id;

    io.emit('onlineUsers',Object.keys(socketUsersMap))
  }

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    delete socketUsersMap[userId];
    io.emit('onlineUsers',Object.keys(socketUsersMap))
  });
});

export { io, app, server };
