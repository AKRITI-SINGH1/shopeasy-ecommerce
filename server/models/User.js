const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
    username: {
        type : Strring,
        required : true,
        unique  : true
    },

    email: {
        type : Strring,
        required : true,
        unique  : true
    },

    password: {
        type : Strring,
        required : true,
        unique  : true
    },

    role: {
        type : Strring,
        default : "user",
    },


});

const User = mongoose.model("User" , "UserSchema");
module.exports = User;