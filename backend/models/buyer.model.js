const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    Buyername: {
        type: String,
        required: true,
        minlength: 3
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Contact_No: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Batch_Name: {
        type: String,
        required: true,
        default: "UG1"
    },
    Wallet: {
        type: Number,
        reuqired: false,
        default: 0
    },
    favorites: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Buyers', exerciseSchema);

module.exports = Exercise;