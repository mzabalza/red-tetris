const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");

const User = require('../../models/User');

// @route       GET api/auth
// @desc        route
// @access      Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error: auth');
    }
});


// @route       POST api/users
// @desc        Authenticate user & get token
// @access      Public
router.post("/",
    [
        check("name", "Please include a valid name").exists(),
        check("password", "Password is required").exists(),
    ],
    // we make this function async to be able to work with asinc/await for mongoose promises. Avoiding .then()
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, password } = req.body;

        try {
            // 1. See if user exists
            let user = await User.findOne({ name });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
            }

            // 4. Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            })


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');

        }
    }
);

module.exports = router;
