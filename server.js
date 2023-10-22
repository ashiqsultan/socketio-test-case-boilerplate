import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');
  // Emit "Hello, world!" when a client connects
  // socket.emit('message', 'Hello, world!');

  // Event "broadcast"
  socket.on('broadcast', (message) => {
    io.emit('broadcastMessage', `Hello everyone: ${message}`);
  });

  // Event "sendMessage"
  socket.on('sendMessage', (data) => {
    console.log({ testData: data });
    // Example data = {username:"",message:""}
    // Broadcast the received message to all users in the same room
    io.emit('message', {
      username: data.username,
      text: data.message,
    });
    console.log("io emmited")
  });

  // Event "disconnect"
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log(`Server is listening on port ${3000}`);
});
