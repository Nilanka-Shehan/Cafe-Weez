const Carts = require("../models/Cart");

const getAllCartByEmail = async(req,res)=>{
    try {
        const email = req.query.email;
        const query = {email:email};
        const result = await Carts.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//add to cart
const addToCart = async(req,res)=>{
    try {
        const {menuItemId,name,recipe,image,price,quantity,email} = req.body;
        const existingItem = await Carts.findOne({menuItemId,email});
        if(existingItem){
            return res.status(409).json({message:"Product is already added !!",existId:existingItem.menuItemId});
        }
        const cartItems = await Carts.create({
            menuItemId,name,recipe,image,price,quantity,email
        })
        res.status(201).json(cartItems);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//delete cart
const deleteCart = async(req,res)=>{
    const cartId = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            res.status(401).json({message:"Cart is not found!"})
        }
        res.status(200).json({message:"Cart is deleted successfully !!",deletedCount:1})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//update cart
const updateCart = async(req,res)=>{
    const cartId = req.params.id;
    const {menuItemId,name,recipe,image,price,quantity,email} = req.body;
    try {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId,
            {menuItemId,name,recipe,image,price,quantity,email},
            {new : true, runValidators: true}

        );
        if(!updatedCart){
            return res.status(404).json({message : "Cart item not found!!"})
        }
        res.status(200).json(updatedCart)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//get single cart
const getSingleCart = async(req,res)=>{
    const cartId = req.params.id;
    try {
        const cartItem = await Carts.findById(cartId);
        if(!cartItem){
            return res.status(404).json({message : "Cart item not found!!"});
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getAllCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
}