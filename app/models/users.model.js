const mongoose = require('mongoose');
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        name: String,
        mobileNo: String,
        password: String,
        role: {
            type: String,
            enum: ['hustler', 'investor', 'coworker'],
            default: 'hustler'
        }
    })
);

module.exports = User
