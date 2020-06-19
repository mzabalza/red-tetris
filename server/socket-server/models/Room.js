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
            name: {
                type: String,
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