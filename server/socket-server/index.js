require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const connectDB = require("./config/db");



const { addUser, removeUser, getUser, getUsersInRoom, editUser } = require('./users');
const { getRooms, addRoom, getRoom } = require('./rooms');


const PORT = process.env.PORT || 5003;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect Database
connectDB();

// ???????? TODO: CORS?? io.origins('*:*') // for latest version???????????

console.log('Users in room:');
console.log(getUsersInRoom('1'));

io.on('connection', (socket) => {

    socket.on('join', async ({ userName, roomName, score, level }, callback) => {


        ///////////////////////////////////////////////////////////////
        // Register User
        // const { error, user } = addUser({ id: socket.id, userName, roomName, score, level });

        // if (error) {
        //     return callback(error)
        // };



        // socket.join - joins a user to a room
        socket.join(roomName);
        console.log(`${userName} joined room ${roomName}`);

        const room = await getRoom(roomName);
        console.log(room.users);

        io.to(roomName).emit('users', { room: room.roomName, users: room.users });




        // io.to(roomName).emit('users', { roomName, users: getUsersInRoom(roomName) });

        // callback(); // As we dont pass {error} the if error statement in front wont be triggered

    });

    socket.on('room', async ({ roomName }) => {
        // const room = await getRoom(roomName);
        // console.log('Providing users in room');
        // console.log(users);

        // io.to(roomName).emit('users', { room: roo,roomName, users: users });

    });

    socket.on('createRoom', ({ masterUser, level, nbPlayers, roomName }, callback) => {
        console.log('Creating Room');
        ///////////////////////////////////////////////////////////////
        // Register Room
        // const addRoom = ({ masterUser, level, nbPlayers, roomName, users }) => {

        const { error, room } = addRoom({ masterUser, level, nbPlayers, roomName });
        // socket.join - joins a user to a room
        if (error) {
            console.log(error);
            return callback(error)
        };

        socket.join(room.roomName);

        // io.emit('rooms', { rooms: getRooms })
        // io.to(user.room).emit('users', { room: user.room, users: getUsersInRoom(user.room) });


    });

    socket.on('editUser', (user) => {
        io.to(user.room).emit('users', { room: user.room, users: editUser({ ...user, id: socket.id }) });
    });


    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    })
});

server.listen(PORT, () => console.log(`Server has started in port ${PORT}`));