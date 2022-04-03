const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    Foodname: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    Veg: {
        type: String,              // 0 is veg, 1 is non veg
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    addons: {
        addonsname: { type: String },
        addonsprice: { type: Number }
    },
    Rating: {
        type: Number,
        required: false,
        default: 0
    },
    Tags: {
        type: String,
        required: true
    },
    Vendor_email: {
        type: String,
        required: true
    },
    // Vendor_Name: {
    //     type: String,
    //     required: true
    // },
    // Opening_Time: {
    //     type: String,
    //     required: true
    // },
    // Closing_Time: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Food', exerciseSchema);

module.exports = Exercise;