const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    Managername: {
        type: String,
        required: true,
        minlength: 3
    },
    ShopName: {
        type: String,
        unique: true,
        required: true
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
    Opening_Time: {
        type: String,
        required: true
    },
    Closing_Time: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Vendors', exerciseSchema);

module.exports = Exercise;