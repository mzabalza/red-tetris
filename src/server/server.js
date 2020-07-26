const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { Game } = require('./models/game.model');
const { Player } = require('./models/player.model');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const users = [];

io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);
    socket.on('join', ({ room, username }) => {

        // socket.join - joins a user to a room
        socket.join(room);
        users.push(username);

        // io.in('<room>').emit - sending to all clients in 'game' room, including sender
        io.in(room).emit('users', { users });
    });
});


server.listen(port, () => {
    console.log(`Listening to ${port}`)
})