const Cart = require('../models/Cart');
const Food = require('../models/Food');
const Order = require('../models/Order');

const placeOrder = async(req, res)=>{
    try{
        const userId = req.user.userId;

        const { deliveryAddress, paymentMethod } = req.body;

        if(!deliveryAddress){
            return res.status(400).json({
                success: false,
                message: "Delivery address is required."
            });
        }

        if(!paymentMethod){
            return res.status(400).json({
                success: false,
                message: "Payment method is required."
            });
        }

        const cart = await Cart.findOne({
            user: userId
        });

        if(!cart || cart.items.length === 0){
            return res.status(400).json({
                success: false,
                message: "Cart is empty."
            })
        };
        let orderItems = [];
        let totalAmount = 0;
        let restaurantId = null;

        for (const cartItem of cart.items){
            const food = await Food.findById(cartItem.food);

            if(!food){
                return res.status(404).json({
                    success: false,
                    message: "One of the food item is unavailable."
                });
                }
                if(!food.isAvailable){
                    return res.status(400).json({
                        success: false,
                        message: `${food.name} is unavailable.`
                    })
                };
                if(!restaurantId){
                    restaurantId = food.restaurant;
                }
                if (food.restaurant.toString() !== restaurantId.toString()) {
                    return res.status(400).json({
                        success: false,
                        message: "All items in an order must belong to the same restaurant."
                    });
            }
            const itemTotal = food.price * cartItem.quantity;

            totalAmount += itemTotal;

            orderItems.push({
                food: food._id,
                name: food.name,
                price: food.price,
                quantity: cartItem.quantity
            });
            }
            const order = await Order.create({
            user: userId,
            restaurant: restaurantId,
            items: orderItems,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            orderStatus: "PLACED"
        });
        cart.items = [];
        cart.totalAmount = 0;

        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            data: order
        });

        }
        catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

module.exports = { placeOrder };

