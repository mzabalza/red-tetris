require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const connectDB = require("./config/db");
const logger = require('./config/logger');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { getRooms, addRoom, getRoom } = require('./rooms');
const { createStage } = require('./gameHelpers/gameHelpers');
const { randomTetromino, TETROMINOS } = require('./gameHelpers/tetrominos');


const PORT = process.env.PORT || 5003;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect Database
connectDB();

// ???????? TODO: CORS?? io.origins('*:*') // for latest version???????????


io.on('connection', (socket) => {
    logger.log('info', `connection: socket ${socket.id}`);
    console.log(`New WebSocket connection ${socket.id}`)

    ///////////////////////////////////////////////////////////////////////////
    // ADD USER TO ROOM
    socket.on('addUser', async ({ body }) => {
        console.log(`socket addUser`);
        socket.join(body.roomName);
        // console.log(`User ${body.userName} with Socket ${socket.id} joined Room ${body.roomName}`);
        const { error, room } = await addUser({ socket: socket.id, ...body });
        io.to(body.roomName).emit('room', { room });
    })

    ///////////////////////////////////////////////////////////////////////////
    // PROVIDE DATA FROM A GIVEN ROM
    socket.on('room', async ({ roomName }) => {
        console.log(`socket Room`);
        const res = await getRoom(roomName);
        const room = res.data;
        console.log('socket.on room');
        console.log(room);
        io.to(roomName).emit('room', { room });

    });

    ///////////////////////////////////////////////////////////////////////////
    // CREATE ROOM
    socket.on('createRoom', ({ masterUser, level, nbPlayers, roomName }, callback) => {
        console.log(`socket createRoom`);

        const { error, room } = addRoom({ masterUser, level, nbPlayers, roomName });
        if (error) {
            console.log(error);
            return callback(error)
        };
    });

    ///////////////////////////////////////////////////////////////////////////
    // REMOVE USER FROM ROOM WHEN DISCONNECT
    socket.on('disconnect', async () => {
        logger.log('info', `disconnect: socket ${socket.id}`);
        console.log(`Socket ${socket.id} disconnected.`);

        try {
            const res = await removeUser({ socket: socket.id });
            io.to(res.data.roomName).emit('room', { room: res.data });

        } catch (error) {
            console.log(`Error: ${error}`)
        }

    });
    ///////////////////////////////////////////////////////////////////////////
    // START GAME
    socket.on('startGame', ({ room }) => {
        io.to(room).emit('startGame');
    })

    socket.on('createStage', () => {
        const stage = createStage();
        io.to(room).emit('stage', { stage });
    })
    ///////////////////////////////////////////////////////////////////////////
    // PROVIDE NEW TETROMINO
    socket.on('resetTetromino', () => {
        const tetromino = randomTetromino();
        logger.log('info', `resetTetromino: tetromino ${tetromino.shape}, socket ${socket.id}`);

        socket.emit('resetTetromino', {tetromino}); // SEND ONLY TO SENDER
    })

    // socket.on('disconnect', () => {
    //     const user = removeUser(socket.id);

    //     if (user) {
    //       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    //       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    //     }
    //   })
});

server.listen(PORT, () => console.log(`Server has started in port ${PORT}`));