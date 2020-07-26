const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require ('bcryptjs')
const {registerValidation, loginValidation} = require ('../../validation');

//Validation
const { json } = require('express');



router.post('/register', async (req, res) => {

    // Lets validate the data before creating a user
    const {error} = registerValidation(req.body)
     if(error) return res.status(400).send(error.details[0].message);

     //checking if the user is already in the database
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exists');

     //Hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
   
});
try{
    const savedUser = await user.save();
    res.send({ user: user._id });
}catch(err){
    res.status(400).send(err);
}
});

//Login
router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(400).send('Email or password is wrong');
    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password')

    res.send('Logged in!');
});

module.exports = router;
