const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
    {
        food:{
            type:mongoose.Schema.Types.ObjectId,
            ref:food,
            required:true
        },
        quantity:{
            type: Number,
            required: true,
            min: [1,"Quantity must be greater than 1."]
        }
    },
    {
        _id: false
    }
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:User,
            required: true,
            unique: true
        },
        items: {
            type:[cartItemSchema],
            default:[]
        },
        totalAmount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Cart',cartSchema);