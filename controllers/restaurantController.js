const Restaurant = require('../models/Restaurant');

const createRestaurant = async(req, res)=> {
    try{
        const{restaurantName, description, address, phoneNumber, email, cuisineType, openingTime, closingTime, isActive}= req.body;

        if(!restaurantName || !address || !cuisineType || ! openingTime || !closingTime){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields."
            });
        }

        const restaurant = await Restaurant.create({
            restaurantName, description, address, phoneNumber, email, cuisineType, openingTime, closingTime, isActive
        });

        res.status(201).json({
            success: true,
            message: "Restaurant created successfully.",
            data: restaurant
        });

    }
    catch(error){
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

const getRestaurant = async(req, res) =>{
    try{
        const restaurant = await Restaurant.find()

        res.status(200).json({
            success: true,
            message: "Restaurants fetched successfully.",
            data: restaurant
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};



module.exports = {createRestaurant, getRestaurant};