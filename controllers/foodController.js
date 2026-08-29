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
};

const deleteFood = async(req, res) =>{
    try{
        const { id } = req.params;

        const food = await Food.findById(id);

        if(!food){
            return res.status(404).json({
                success: false,
                message: "Food not found."
            });
        }

        await Food.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Food item deleted successfully."
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

const getFoods = async(req, res) => {
    try{
        const {search, category, restaurant, minPrice, maxPrice, isAvailable, page=1, limit=10} = req.query;

        const filter = {};

        if(search){
            filter.name ={
                $regex: search,
                $options: 'i'
            };
        }
        if(category){
            filter.category = category;
        }
        if(restaurant){
            filter.restaurant = restaurant;
        }
        if(minPrice !== undefined || maxPrice !== undefined){
            filter.price={};

            if(minPrice !== undefined){
                filter.price.$gte = Number(minPrice);
            }
            if(maxPrice !== undefined){
                filter.price.$lte = Number(maxPrice);
            }
        }
        if(isAvailable !== undefined){
            filter.isAvailable = isAvailable === "true";
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1)* limitNumber;

        const foods = await Food.find(filter)
            .populate('restaurant', 'restaurantName')
            .skip(skip)
            .limit(limitNumber);

        const totalFoods = await Food.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: "Food items fetched successfully.",
            data: foods,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalFoods / limitNumber),
                totalItems: totalFoods,
                limit: limitNumber
            }
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


module.exports = {addFood, getRestaurantFood, updateFood, deleteFood, getFoods}