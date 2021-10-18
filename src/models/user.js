const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    pin: {
        type: Number,
        required: true,
    },
    questions : {
        type : [Number],
        default : [0,1,2,3,4],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
