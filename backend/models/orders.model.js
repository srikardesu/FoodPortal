const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    Placed_Time: {
        type: String,
        required: true,
    },
    Vendor_Name: {
        type: String,              // 0 is veg, 1 is non veg
        required: true
    },
    Food_Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        required: true,
    },
    Cost: {
        type: Number,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Buyer_Email: {
        type: String,
        required: true
    },
    Vendor_Email: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Orders', exerciseSchema);

module.exports = Exercise;