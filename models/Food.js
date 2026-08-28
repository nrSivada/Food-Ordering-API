const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, "Restaurant is required."]
    },
    name: {
        type: String,
        required: [true, "Food name is required."],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required."]
    },
    imageUrl: {
        type: String,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default:true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Food', foodSchema);