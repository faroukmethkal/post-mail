const mongoose = require('mongoose');


const Company = mongoose.model('Company', {
    name: {
        type: String,
        required: true
        },
    email: {type: String,
            required: true,
            unique: true,
        },
    message: {
        type: String,
        default:'You have no message'
    },
    date: {
            type: Date,
            default: Date.now
        }
});

module.exports = Company
