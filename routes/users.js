const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


//@route POST pi/users
//@route Register a user
//@access public
router.post('/',
    [
        check('name', 'name is required')
            .not()
            .isEmpty(),
        check('email', 'email required').not().isEmpty(),
        check('email', 'Valid email required').isEmail(),
        check('password', 'Minimum characterr required is 6')
            .isLength({ min: 6 })],

    async (req, res) => {
        //     const errors = validationResult(req);
        //     if (!errors.isEmpty()) {
        //         return res.status(400).json({ errors: errors.array() });
        //     }
        //     try {
        //         const { name, email, password } = req.body;
        //         let user = await User.findOne({ email });
        //         if (user) {
        //             return res.status(400).json({ msg: 'user already exists ' });
        //         }
        //         user = new User({
        //             name,
        //             email,
        //             password
        //         });

        //         const salt = await bcrypt.genSalt(10);
        //         user.passowrd = await bcrypt.hash(password, salt);
        //         await user.save();
        //         const payload = {
        //             user: {
        //                 id: user.id
        //             }
        //         };
        //         jwt.sign(payload, config.get('jwtSecret'), {
        //             expiresIn: 360000
        //         }, (err, token) => {
        //             if (err) throw err;
        //             res.json({ token });
        //         });
        //     } catch (err) {
        //         console.error(err.message);
        //         res.status(500).send("error in server");
        //     }
    });
module.exports = router;