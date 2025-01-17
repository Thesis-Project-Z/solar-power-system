const router = require('express').Router();
require("dotenv").config();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../../validation');
const jwt = require('jsonwebtoken');
//Validation
const { json } = require('express');




router.post('/register', async (req, res) => {
    // console.log(req.body)
    // Lets validate the data before creating a user
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    // console.log('test')
    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword

    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');
    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send(token);
});



router.get('/user', async (req, res) => {
    User.find()
        .then(ziyad => res.json(ziyad))
        .catch(error => res.json(err))
});



module.exports = router;
