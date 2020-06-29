const mongoose = require("mongoose");

const GamerSchema = new mongoose.Schema({
  socket: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  roomName: {
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
});

module.exports = Gamer = mongoose.model("gamer", GamerSchema);
