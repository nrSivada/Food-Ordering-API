const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

const addFood = async(req, res) =>{
    try{
        const{ restaurantId } = req.params;

        const{name, description, category, price, imageUrl, isAvailable} = req.body;

        if(!name || !price || !category){
            return res.status(400).json({
                success: false,
                message: "Provide required fields."
            });
        }

        if(price<=0){
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0."
            });
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant){
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const food = await Food.create({
            restaurant: restaurantId,
            name, 
            description,
            category,
            price,
            imageUrl,
            isAvailable
        });

        res.status(201).json({
            success: true,
            message: "Food item added successfully.",
            data: food
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

const getRestaurantFood = async(req, res) =>{
    try{
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant){
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const food = await Food.find({
            restaurant: restaurantId
        });

        res.status(200).json({
            success: true,
            message: "Food items fetched successfully.",
            Foods: food
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

const updateFood = async(req, res) =>{
    try{
        const{ id } = req.params;

        const food = await Food.findById(id);

        if(!food){
            return res.status(404).json({
                success: false,
                message: "Food not found."
            });
        }

        const updatedFood = await Food.findByIdAndUpdate(
            id, 
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Food item updated successfully.",
            food: updatedFood
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

module.exports = {addFood, getRestaurantFood, updateFood}