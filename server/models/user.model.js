const { Schema, model } = require('mongoose');

const User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }],
});

module.exports = model('User', User);