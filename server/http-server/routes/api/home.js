const express = require('express');
const router = express.Router();

// @route       GET api/home
// @desc        Register user
// @access      Public
router.get('/', (req, res) => {
    res.json({ message: 'Wellcome to tetris api' });
})


module.exports = router;