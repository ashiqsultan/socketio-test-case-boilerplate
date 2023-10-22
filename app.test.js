import request from 'supertest';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import server from './server'; // Assuming server.js exports the Express app

describe('Socket.io Server', () => {
  let httpServer;
  let ioServer;

  beforeAll((done) => {
    const app = express();
    httpServer = http.createServer(app);
    ioServer = new Server(httpServer);
    // Start the server
    httpServer.listen(0, () => {
      done();
    });
  });

  //   afterAll((done) => {
  //     // Close the server after all tests are done
  //     ioServer.close(() => {
  //       httpServer.close(() => {
  //         done();
  //       });
  //     });
  //   });

  //   it('should respond with "Hello, world!" on socket connection', (done) => {
  //     const client = require('socket.io-client')(`http://localhost:3000`);
  //     client.on('message', (message) => {
  //       expect(message).toEqual('Hello, world!');
  //       done();
  //     });
  //   });

  it('should broadcast "Hello everyone: Test message" to all clients', (done) => {
    const client1 = require('socket.io-client')(`http://localhost:3000`);
    const client2 = require('socket.io-client')(`http://localhost:3000`);

    client1.on('message', (message) => {
      // Don't need to assert here; the other client's callback handles it
    });

    client2.on('message', (message) => {
      expect(message).toEqual('Hello everyone: Test message');
      // client1.disconnect();
      // client2.disconnect();
      done();
    });

    // Emit the "broadcast" event from one of the clients
    client1.emit('broadcast', 'Test message');
  });
});
