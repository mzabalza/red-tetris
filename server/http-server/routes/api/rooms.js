const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");



const Room = require('../../models/Room');

// @route       POST api/users
// @desc        Register room
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

        console.log(`Register Room: ${roomName}`);

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

// @route       DELETE api/room
// @desc        Delete room by roomName
// @access      Private
router.delete('/', [[
    check("roomName", "Name is required").not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);

        return res.status(400).json({ errors: errors.array() })
    }

    console.log(`Delete Room: ${roomName}`);

    const { roomName } = req.body;

    // 1. See if room exists
    let room = await Room.findOne({ roomName });
    if (!room) {
        return res.status(400).json({ errors: [{ msg: 'Room doesnt exist' }] })
    }

    try {
        await Room.findOneAndRemove({ roomName });
        res.json({ msg: 'Room deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route       GET api/room/
// @desc        Get all rooms
// @access      Public
router.get('/', async (req, res) => {

    console.log(`Get all rooms`);


    try {
        const rooms = await Room.find();

        res.json(rooms);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route       GET api/room/:roomId
// @desc        Get room properties
// @access      Public
router.get('/:roomName', async (req, res) => {

    try {
        const room = await Room.findOne({ roomName: req.params.roomName })
        if (!room) {
            return res.status(400).json({ errors: [{ msg: 'Room doesnt exist' }] })
        }
        res.json(room);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route       PUT api/room/
// @desc        Put user in room
// @access      Public
router.put('/',
    [
        // userName, roomName, score, level
        check("socket", "userName is required").not().isEmpty(),
        check("userName", "userName is required").not().isEmpty(),
        check("roomName", "roomName is required").not().isEmpty(),
        check("score", "score is required").not().isEmpty(),
        check("level", "level is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)

            return res.status(400).json({ errors: errors.array() })
        }

        const { socket, roomName, userName, score, level } = req.body;
        console.log(`Put ${userName} user in room ${roomName}`)


        const user = { socket, userName, score, level };

        try {
            const room = await Room.findOne({ roomName });
            if (!room) {
                return res.status(400).json({ errors: [{ msg: 'Room doesnt exist' }] });
            }

            index = room.users.findIndex(user => user.socket === socket);

            if (index === -1) {
                console.log('pushing user');
                room.users.unshift(user); // pushes to the beginning of an array
            } else {
                console.log('User exists')
                console.log(user)
                room.users[index] = user
            };

            await room.save();
            console.log('saved');

            res.json(room);





        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');

        }
    });

// @route       DELETE api/room/
// @desc        Delete user in room by socket.id
// @access      Public
// TODO: Make it private
router.delete('/socket',
    [
        check('socket', 'socket is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { socket } = req.body;
        console.log(`Deleting user in room with socket: ${socket}`)

        try {

            const rooms = await Room.find();
            if (!rooms) {
                return res.status(400).json({ errors: [{ msg: 'Room doenst exist' }] })
            }

            let room_name_tmp = null
            let user_name_tmp = null

            rooms.map((room) => {
                room.users.map((user => {
                    if (user.socket === socket) {
                        room_name_tmp = room.roomName;
                        user_name_tmp = user.userName;
                    }
                }))
            })

            console.log(room_name_tmp, user_name_tmp);

            if (!room_name_tmp) {
                console.log(`User not found for socket id: ${socket}`);
                res.json({ message: `User not found for socket id: ${socket}` })
            }

            const room_tmp = await Room.findOne({ roomName: room_name_tmp });
            if (room_tmp) {
                room_tmp.users = room_tmp.users.filter(user => user.socket != socket);
                await room_tmp.save();

            }
            res.json(room_tmp);


        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');

        }
    });

// @route       DELETE api/room/
// @desc        Delete user in room
// @access      Public
// TODO: Make it private
router.delete('/:roomName',
    [
        check('userName', 'userName is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { userName } = req.body;

        try {
            const room = await Room.findOne({ roomName: req.params.roomName });
            if (!room) {
                return res.status(400).json({ errors: [{ msg: 'Room doenst exist' }] })
            }


            room.users = room.users.filter(user => user.userName != userName)
            await room.save();
            res.json(room);

        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');

        }
    });



module.exports = router;