const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async(req, res) => {
    try{
        const {fullName, email, password, phoneNumber, address} = req.body;

        if(!fullName || !email ||!password || !phoneNumber){
            return res.status(400).json({
                success: true,
                message: "Please fill the required fields."
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "Email already exist."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            address
        });

        res.status(201).json({
            success: true,
            message: "user registered successfully."
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }

}

module.exports = {registerUser};