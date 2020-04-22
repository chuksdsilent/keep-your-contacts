const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contacts = require('../models/Contacts');
const auth = require('../middlware/auth');
const config = require('config');


//@route GET api/Contacts
//@desc  Get all users contacts
//@success Private
router.get('/', auth, async (req, res) => {
    try {

        const contact = await Contacts.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contact);
    } catch (err) {
        console.error(err);
    }
});


//@route POST api/Contacts
//@desc  Add contact
//@success Private
router.post('/',
    [
        auth,
        check('name', 'name is required').not().isEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { name, email, phone, type } = req.body;
            const newContact = new Contacts({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });
            const contact = await newContact.save();
            res.json(contact);

        } catch (err) {
            console.error(err);
        }

    });

//@route UPDATE api/Contacts
//@desc  update  contacts
//@success Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contactfields = {};
    if (name) contactfields.name = name;
    if (email) contactfields.email = email;
    if (phone) contactfields.phone = phone;
    if (type) contactfields.type = type;

    try {
        let contact = await Contacts.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Not Authorized' });
        }

        contact = await Contacts.findByIdAndUpdate(
            req.params.id,
            {
                $set: contactfields
            },
            {
                new: true
            }
        );
        return res.json(contact);

    } catch (error) {
        console.error(error);
    }
});

//@route DELETE api/Contacts
//@desc  delete  contacts
//@success Private
router.delete('/:id', auth, async (req, res) => {

    try {
        let contact = await Contacts.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Not Authorized' });
        }

        await Contacts.findByIdAndRemove(req.params.id);
        return res.json({ 'msg': 'contact deleted...' });

    } catch (error) {
        console.error(error);
    }
});

module.exports = router