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
    io.emit('message', `Hello everyone: ${message}`);
  });

  // Event "disconnect"
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log(`Server is listening on port ${3000}`);
});
