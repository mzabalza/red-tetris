const axios = require('axios');

const rooms = [];

const addRoom = ({ masterUser, level, nbPlayers, roomName }) => {

    const room = {
        masterUser,
        level,
        nbPlayers,
        roomName,
        users: [masterUser]
    };
    console.log(`New room: ${room}`);

    const existingRoom = rooms.find((room) => room.roomName === roomName);

    if (existingRoom) {
        return { error: 'Room name is taken' };
    };

    rooms.push(room);

    return { room };
};

const getRoom = async (roomName) => {

    const room = `{process.env.}http://localhost:5005/api/room/mordor`

    // rooms.find((room) => room.roomName === roomName);

}


const getRooms = () => rooms;


module.exports = { addRoom, getRoom, getRooms };