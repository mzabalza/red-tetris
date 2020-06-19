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
const users = [];

// const addUser = ({ id, name, room, score, level }) => {
//     // Clean variables
//     name = name.trim().toLowerCase();
//     room = room.trim().toLowerCase();
//     // Check if user exists
//     const existingUser = users.find((user) => user.room === room && user.name === name);

//     if (existingUser) {
//         return { error: 'Username is taken' };
//     }
//     const user = { id, name, room, score, level };

//     users.push(user);

//     return { user };
// };
const addUser = ({ id, userName, roomName, score, level }) => {
    // Clean variables
    // ...
    // Check if user exists
    // const existingUser = users.find((user) => user.room === room && user.name === name);

    // if (existingUser) {
    //     return { error: 'Username is taken' };
    // }
    const user = { id, name, room, score, level };

    users.push(user);

    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
};

const editUser = (editedUser) => {
    const foundIndex = users.findIndex(user => user.id == editedUser.id);
    users[foundIndex] = editedUser;
    return users
};

const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);
const getUsersInRoom = async (roomName) => {
    const res = await axios.get(`${process.env.API_URI}/room/${roomName}`);
    return res.users

};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, editUser };