const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        restaurantName: {
            type: String,
            required: [true, "Restaurant name is required."],
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        cuisineType: {
            type: String,
            required: [true, "cuisine type is required."]
        },
        openingTime: {
            type: String,
            required: [true, "opening type is required."]
        },
        closingTime: {
            type: String,
            required: [true, "Closing time is required."]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);