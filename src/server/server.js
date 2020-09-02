const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { Game } = require('./models/game.model');
const { Player } = require('./models/player.model');
const { Games } = require('./models/games.model');

const { randomTetromino } = require('./utils/tetrominos');

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = socketio(server, { pingTimeout: 6000000 });

const games = new Games();


io.on('connect', (socket) => {
    console.log(`New player connected: ${socket.id}`);
    socket.on('join', ({ room, username }) => {


        // socket.join - joins a player to a room
        socket.join(room);

        const player = new Player({ name: username, id: socket.id });
        const game = games.addPlayer(room, player);

        if (game.started) {
            return socket.emit('out', { message: `Game already started in room: ${room}` });
        }

        // io.in('<room>').emit - sending to all clients in 'game' room, including sender
        io.to(room).emit('game', { game });

        // Initialize tetrominos for the game
        const nextTetrominos = game.getTwoTetrominos(1);
        socket.emit('nextTetrominos', { tetrominos: nextTetrominos });


    });

    socket.on('startGame', ({ room }) => {
        // const game = games.findGame(room);
        console.log('startGame');

        const game = games.findGame(room);

        game.update({ started: true });
        io.to(room).emit('startGame');


    })

    socket.on('newTurn', ({ room, turn, rows }) => {
        console.log('new Turn');

        const game = games.findGame(room);

        const player = game.findPlayer(socket.id);

        player.update({ turn, rows });
        console.log(`player: ${player.name} Turn: ${turn}, rows: ${rows}`);


        const nextTetrominos = game.getTwoTetrominos(turn);

        io.to(room).emit('game', { game });


        socket.emit('nextTetrominos', { tetrominos: nextTetrominos });

    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);

        const game = games.removePlayer(socket.id);

        // remove game if no players inside


        // If player was found...
        if (game) {
            if (game.players.length === 0) {
                return games.removeGame(game.room);
            }
            io.to(game.room).emit('game', { game });
        }
    })

});

server.listen(port, () => {
    console.log(`Listening to ${port}`)
})