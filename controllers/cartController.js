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
        let totalAmount=0;

        for (const item of cart.items){
            const foodItem = await Food.findById(item.food);

            if(foodItem){
                totalAmount += foodItem.price * item.quantity;
            }
        }

        cart.totalAmount=totalAmount;

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

const getCart = async(req, res) =>{
    try{
        const userId = req.user.userId;

        const cart = await Cart.findOne({
            user:userId
        }).populate(
            'items.food',
            'name description category price imageUrl isAvailable'
        );

        if(!cart){
            return res.status(200).json({
                success: true,
                message: "Cart is empty.",
                date: {
                    items:[],
                    totalAmount:0
                }
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

const updateCartItem = async(req, res) => {
    try{
        const userId = req.user.userId;
        const { foodId } = req.params;
        const { quantity } = req.body;

        if(quantity === undefined){
            return res.status(400).json({
                success: false,
                message: "Quantity is required."
            });
        }

        if(quantity <=0){
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0."
            });
        }

        const cart = await Cart.findOne({
            user: userId
        });

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }
        const cartItem = cart.items.find(
            item => item.food.toString() === foodId
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Food item is not in the cart."
            });
        }

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found."
            });
        }

        if (!food.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Food item is currently unavailable."
            });
        }

        cartItem.quantity = quantity;

        let totalAmount = 0;

        for (const item of cart.items) {
            const foodItem = await Food.findById(item.food);

            if (foodItem) {
                totalAmount += foodItem.price * item.quantity;
            }
        }
        cart.totalAmount = totalAmount;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart item quantity updated successfully.",
            data: cart
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

const removeFromCart = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const {foodId} = req.params;

        const cart = await Cart.findOne({
            user: userId
        });

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        const itemExists = cart.items.some(
            item => item.food.toString() === foodId
        );

        if (!itemExists) {
            return res.status(404).json({
                success: false,
                message: "Food item is not in the cart."
            });
        }
        cart.items = cart.items.filter(
            item => item.food.toString() !== foodId
        );

        let totalAmount = 0;

        for (const item of cart.items) {
            const foodItem = await Food.findById(item.food);

            if (foodItem) {
                totalAmount += foodItem.price * item.quantity;
            }
        }

        cart.totalAmount = totalAmount;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Food item removed from cart.",
            data: cart
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

const clearCart = async (req, res) =>{
    try{
        const userId = req.user.userId;

        const cart = await Cart.findOne({
            user: userId
        });

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        cart.items = [];
        cart.totalAmount=0;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully."
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

module.exports = {addToCart, getCart, updateCartItem, removeFromCart, clearCart};