const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { Game } = require('./models/game.model');
const { Player } = require('./models/player.model');
const { Games } = require('./models/games.model');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const games = new Games();



io.on('connection', (socket) => {
    console.log(`New player connected: ${socket.id}`);
    socket.on('join', ({ room, username }) => {

        // socket.join - joins a player to a room
        socket.join(room);

        const game = games.addPlayer(room, username)

        console.log(games);

        // io.in('<room>').emit - sending to all clients in 'game' room, including sender
        io.in(room).emit('game', { game });
    });
});


server.listen(port, () => {
    console.log(`Listening to ${port}`)
})