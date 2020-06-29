const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

const Gamer = require('../../models/Gamer');

// @route       GET api/gamers
// @desc        Get all gamers
// @access      Public
router.get('/', async (req, res) => {

    try {
        const users = await Gamer.find();
        res.json(users)

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route       POST api/gamers
// @desc        Add gamer
// @access      Public
router.post('/',
    [
        check("roomName", "Name is required").not().isEmpty(),
        check("nbPlayers", "nbPlayers is required").not().isEmpty(),
        check("level", "level is required and should be integer").isInt(),
        check("masterUser", "masterUser is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { roomName, nbPlayers, level, masterUser } = req.body;

        try {
            // 1. See if room exists
            let room = await Room.findOne({ roomName });
            if (room) {
                return res.status(400).json({ errors: [{ msg: 'Room already exists' }] })
            }

            room = new Room({
                roomName,
                nbPlayers,
                level,
                masterUser
            })

            await room.save();

            res.json({
                message: "Room successfully created.",
                room: { roomName, nbPlayers, level, masterUser }
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');

        }

    }
);