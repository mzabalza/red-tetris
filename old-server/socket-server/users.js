// HELPER FUNCTIONS FOR USERS
const axios = require('axios');

///////////////////////////////
// USER = [{
//  id
//  name
//  room
//  score
//  level
// }]

const addUser = async ({ socket, userName, roomName, score, level }) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = { socket, roomName, userName, score, level };
    try {
        const res = await axios.put(`${process.env.API_URI}/room`, body, config);
        return { room: res.data }
    } catch (error) {
        console.log(error.message)
        return { error }
    }
};

const removeUser = async (socket) => {

    try {
        const res = await axios.delete(`${process.env.API_URI}/room/socket`, { data: socket });
        return { room: res.data }
    } catch (error) {
        console.log(`Error: ${error}`)
        return { error }
    };
};

// const editUser = async (user) => {
//     body = user
//     try {
//         const res = await axios.put(`${process.env.API_URI}/room`, body, config);
//         return { room: res.data }
//     } catch (error) {
//         console.log(error.message)
//         return { error }
//     }
// };

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = async (roomName) => {
    const res = await axios.get(`${process.env.API_URI}/room/${roomName}`);
    return res.users

};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };