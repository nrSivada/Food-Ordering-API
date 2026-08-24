const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "full name is required"],
            trim: true

        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            trim: true
        },
        password:{
            type: String,
            required: [true, "password is required"]
        },
        phoneNumber: {
            type: String,
            required: [true, "phone number is required"],
            trim: true
        },
        address: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum:["user","admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);