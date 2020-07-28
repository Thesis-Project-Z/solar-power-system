const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6

    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6 
    },
    date: {
        type: Date,
        default: Date.now
    }
});
 const User = mongoose.model('User', userSchema);


//  const test = new User({
//     name: "usertest111",
//     email:"gijs@goak.com",
//     password:"dafaadfa"
// })

// test.save().then(()=> console.log('saved')).catch((err)=> console.log('failed', err))

 module.exports = User;
