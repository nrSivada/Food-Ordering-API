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

const getRestaurantById = async(req, res) => {
    try{
        const {id} = req.params;

        const restaurant = await Restaurant.findById(id);

        if(!restaurant){
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Restaurant fetched successfully.",
            restaurant: restaurant
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

const updateRestaurant = async(req, res) => {
    try{
        const {id} = req.params;

        const restaurant = await Restaurant.findById(id);

        if(!restaurant){
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const updateRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully.",
            updated: updateRestaurant
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
module.exports = {createRestaurant, getRestaurant, getRestaurantById, updateRestaurant};