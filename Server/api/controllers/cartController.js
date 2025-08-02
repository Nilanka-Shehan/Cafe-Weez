const Carts = require("../models/Cart");
const Menus = require("../models/Menu");

console.log;
const getAllCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    //console.log(result)
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, email } = req.body;
    const product = await Menus.findById(productId);
    const productDetails = {
      name: product.name,
      image: product.image,
      price: product.price,
    };
    const existingItem = await Carts.findOne({ productId, email });
    if (existingItem) {
      return res
        .status(409)
        .json({
          message: "Product is already added !!",
          existId: existingItem.productId,
        });
    }
    const cartItems = await Carts.create({
      productId,
      name: productDetails.name,
      image: productDetails.image,
      price: productDetails.price,
      quantity,
      email,
    });
    res.status(201).json({ success: true, cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete cart
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      res.status(401).json({ message: "Cart is not found!" });
    }
    res
      .status(200)
      .json({ message: "Cart is deleted successfully !!", deletedCount: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete cart using email
const deleteCartUsingEmail = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const cartItems = await Carts.find(query);
    if(!cartItems){
        res.status(401).json({ message: "User not found!" });
    }
    await Carts.deleteMany(query)
    res.status(200)
      .json({ message: "Carts is deleted successfully !!",cartItems});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update cart
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  // console.log(req.body)
  // const {menuItemId,name,recipe,image,price,quantity,email} = req.body;
  const { quantity } = req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true, runValidators: true }
    );
    //console.log(updatedCart)
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found!!" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single cart
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found!!" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCartByEmail,
  addToCart,
  deleteCart,
  deleteCartUsingEmail,
  updateCart,
  getSingleCart,
};
