const mongoose = require("mongoose");


const RoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true,
    },
    nbPlayers: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    users: [
        {
            socket: {
                type: String,
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            level: {
                type: Number,
                required: true
            }
        }
    ],
    masterUser: {
        type: String,
        required: true,

    }

});

module.exports = Room = mongoose.model("room", RoomSchema);