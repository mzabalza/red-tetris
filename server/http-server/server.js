const express = require('express');
const connectDB = require("./config/db");
var cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Allows to get the data in req.body
// Then use it before your routes are set up:
app.use(cors());
app.use(express.json({ extend: false }));

const PORT = process.env.PORT || 5005;

// Define Routes
app.use("/api/home", require("./routes/api/home"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/users"));
app.use("/api/room", require("./routes/api/rooms"));


app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});