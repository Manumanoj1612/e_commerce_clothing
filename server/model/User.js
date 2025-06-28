const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        requried: true

    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    role: {
    type: String,
    enum: ['admin', 'customer'], // limit to only these values
    required: true,
    default: 'customer', // optional default
  },
})
const user = mongoose.model('user', userSchema);
module.exports = user;