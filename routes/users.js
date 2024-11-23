// const mongoose = require('mongoose')
// const plm = require('passport-local-mongoose')


// mongoose.connect("mongodb://127.0.0.1:27017/pinterest-2");
  

// const userSchema = new mongoose.Schema({

//     Username:String,
//     name:String,
//     email:String,
//     password:String,
//     profileImage:String,
//     contact:Number,
//     boards: {
//         type: Array,
//         default: [],
//     }

// });

// userSchema.plugin(plm)

// module.exports = mongoose.model("user", userSchema) 


const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterest-2");

const userSchema = new mongoose.Schema({
    username: String, // Add username field
    name: String,
    email: String,
    password: String,
    profileImage: String,
    contact: Number,
    boards: {
        type: Array,
        default: [],
    }
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema); 
