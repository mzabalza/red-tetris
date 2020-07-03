require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const connectDB = require("./config/db");



const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
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

        // const { error, user } = addUser({ id: socket.id, name, room });

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

    socket.on('addUser', async ({ body }) => {

        socket.join(body.roomName);
        console.log(`${body.userName} joined room ${body.roomName}`);
        console.log(body);
        const { error, room } = await addUser({ socket: socket.id, ...body });
        console.log(room);

        io.to(body.roomName).emit('room', { room });

    })

    ///////////////////////////////////////////////////////////////////////////
    // PROVIDE DATA FROM A GIVEN ROM
    socket.on('room', async ({ roomName }) => {
        const res = await getRoom(roomName);
        const room = res.data;
        // console.log('Providing users in room');
        console.log('socket.on room');
        console.log(room);
        io.to(roomName).emit('room', { room });

    });

    ///////////////////////////////////////////////////////////////////////////
    // CREATE ROOM
    socket.on('createRoom', ({ masterUser, level, nbPlayers, roomName }, callback) => {
        console.log('Creating Room');


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

    // socket.on('editUser', (user) => {
        
    //     console.log('editUser:')
    //     console.log(user)
    //     const users = addUser({ ...user, id: socket.id })

    //     io.to(user.room).emit('users', { room: user.room, users });
    // });


    socket.on('disconnect', async () => {
        console.log('********************** socket id:');
        console.log(socket.id)
        console.log(`Socket ${socket.id} disconnected.`);
        const res = await removeUser({ socket: socket.id });

        console.log('RES DATA!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(res);

        io.to(res.data.roomName).emit('room', { room: res.data });
    });

    // socket.on('disconnect', () => {
    //     const user = removeUser(socket.id);

    //     if (user) {
    //       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    //       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    //     }
    //   })
});

server.listen(PORT, () => console.log(`Server has started in port ${PORT}`));