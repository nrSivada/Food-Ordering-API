const mongoose = require('mongoose');
const User = require('./User');
const Restaurant = require('./Restaurant');

const orderItemSchema = new mongoose.Schema(
    {
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Food,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min:1
        }
    },
    {
        _id:false
    }
);

const orderSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Restaurant,
            required: true
        },
        items: {
            type:[orderItemSchema],
            required: true,
            validate: {
                validator: function(items) {
                    return items.length>0;
                },
                message: "Order must contain atleast one item."
            }
        },
        totalAmount: {
            type: Number,
            required: true,
            min:0
        },
        deliveryAddress: {
            type: String,
            required: [true, "Delivery address is required."],
            trim: true
        },
        paymentMethod: {
            type: String,
            enum:["COD","CARD","UPI"],
            required: [true, "Payment method is required."]
        },
        orderStatus: {
            type: String,
            enum: ["PLACED", "CONFIRMED","PREPARING","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"],
            default: "PLACED"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);