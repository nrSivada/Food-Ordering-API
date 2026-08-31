const Cart = require('../models/Cart');
const Food = require('../models/Food');

const addToCart = async(req, res) =>{
    try{
        const userId = req.user.userId;

        const { foodId, quantity } = req.body;

        if(!foodId || quantity === undefined){
            return res.status(400).json({
                success:false,
                message: "Food Id and Quantity are required."
            });
        }

        if(quantity<=0){
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0."
            });
        }

        const food = await Food.findById(foodId);

        if(!food){
            return res.status(404).json({
                success: false,
                message: "Food item not found."
            });
        }

        if(!food.isAvailable){
            return res.status(400).json({
                success: false,
                message: "Food item is currently unavailable."
            });
        }

        let cart = await Cart.findOne({user:userId});

        if(!cart){
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        const existingItem = cart.items.find(
            item=>item.food.toString() === foodId
        );

        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            cart.items.push({
                food:foodId,
                quantity
            });
        }
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Food item added to cart.",
            data:cart
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

module.exports = {addToCart}