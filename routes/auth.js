const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlware/auth')
//@route POST api/auth
//@route  Get logged in user
//@success priver
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("error from server");
    }
});


//@route POST api/auth
//@route  Auth user and get token
//@success public
router.post('/',
    [
        check('email', 'email required').not().isEmpty(),
        check('email', 'Valid email required').isEmail(),
        check('password', 'Minimum characterr required is 6')
            .isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ errors: [{ msg: 'Incorrect Credentials' }] })
            }

            if (password !== user.password) {
                res.status(400).json({ errors: [{ msg: 'Incorrect Credentials' }] })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (err) {
            res.send(err.message);
            res.status(500).send("error in server");
        }
    });
module.exports = router;