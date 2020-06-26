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

    const res = await axios.get(`${process.env.API_URI}/room/${roomName}`);
    return res

}


const getRooms = () => rooms;


module.exports = { addRoom, getRoom, getRooms };