const mongoose = require('mongoose');

const verifiedUserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    idProof: {
        data: Buffer,
        contentType: String
    },
    panNumber:String,
    role: {
        type: String,
        enum: ['admin', 'user'], // Example roles, adjust as needed
        default: 'user'
    },
    address: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const VerifiedUser = mongoose.model('VerifiedUser', verifiedUserSchema);

module.exports = VerifiedUser;
