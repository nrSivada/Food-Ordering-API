const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign({
            userId:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    );

    res.status(200).json({
        success:true,
        message: "Login successfull.",
        data:{
            token
        }
    })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        });
    }
}

const getUser = async(req, res) => {
    try{
        const user = await User.findById(req.user.userId).select("-password");
        
        if(!user){
            return res.status(404).json({
                success:false,
                message: "user not found."
            });
        }

        res.status(200).json({
            success:true,
            message: "profile fetched successfully.",
            data: user
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internal server error."
        });
    }
}

module.exports = {registerUser,loginUser, getUser};