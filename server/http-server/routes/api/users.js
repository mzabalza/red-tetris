const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");

const User = require('../../models/User');


// @route       GET api/users
// @desc        Get all users
// @access      Public
router.get('/', async (req, res) => {
  console.log(`Get all users subscribed to TETRIS.IO`);
  try {
    const users = await User.find();
    res.json(users)

  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/users
// @desc        Register user
// @access      Public
router.post("/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  // we make this function async to be able to work with asinc/await for mongoose promises. Avoiding .then()
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() })
    }
    console.log(`Register User: ${name}`);

    // console.log(req.body);
    const { name, password } = req.body;

    try {
      // 1. See if user exists
      let user = await User.findOne({ name });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({
        name,
        password
      }); // Creates instance of User but not saved yet

      // 3. Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

// @route       DELETE api/profile
// @desc        Delete profile, user, & post
// @access      Private
// router.delete('/', auth, async (req, res) => {

//   try {
//     // Remove users posts
//     // await Post.deleteMany({ user: req.user.id });

//     // // Remove profile
//     // await Profile.findOneAndRemove({ user: req.user.id });
//     // Remove user
//     await User.findOneAndRemove({ _id: req.user.id });

//     res.json({ msg: 'User deleted' });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// @route       DELETE api/user
// @desc        Delete user by username
// @access      Private
router.delete('/', auth, [[
  check("name", "Name is required").not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(error);
    return res.status(400).json({ errors: errors.array() })
  }
  const { name } = req.body;
  console.log(`Delete User: ${name}`);

  // 1. See if room exists
  let user = await User.findOne({ name });
  if (!user) {
    return res.status(400).json({ errors: [{ msg: 'User doesnt exist' }] })
  }


  try {
    await User.findOneAndRemove({ name });
    res.json({ msg: `User ${name} deleted` });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
