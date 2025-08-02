import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAth";
import useAiosSecure from "../hooks/useAxiosSecure";
import { addToCart, changeQuantity } from "../pages/cart/CardSlice";

const FoodCard = ({ item }) => {
  //console.log("item:",item)
  const dispatch = useDispatch();
  const axiosSecure = useAiosSecure();
  const {user} = useAuth();


  const carts = useSelector((state) => state.card.cart.items);

  if (!item) {
    return <div className="text-red-500 text-center p-2">Error: No product data available.</div>;
  }

  const { _id, name, price, image } = item;

  if (!_id || !name || !price || !image) {
    return <div className="text-red-500 text-center p-2">Error: Missing product details.</div>;
  }

  const handleAddToCart = async () => {
    const existingItem = carts.find((cartItem) => cartItem.productId === item._id);
    //console.log(existingItem)
  
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;

      //console.log(newQuantity)
      
      try {
        //console.log("existing Item:",existingItem)
        // Update the existing item
        const response = await axiosSecure.put(`/carts/${existingItem._id}`, { quantity: newQuantity });
        
        if (response.status === 200) {
          dispatch(changeQuantity({ _id:existingItem._id ,productId:existingItem.productId, quantity: newQuantity }));
          alert(`Increased quantity of ${name} to ${newQuantity}.`);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
        alert("Error updating quantity.");
      }
    } else {
      const newItem = { _id,productId:item._id, name, price, image, quantity: 1 };
  
      try {
        // Add new item to cart
        const response = await axiosSecure.post("/carts", { productId:item._id, quantity: 1, email: user?.email });
        //console.log(response)
        if (response.data.success) {
          newItem._id = response.data.cartItems._id; // Make sure to get the new _id from the response
          //console.log("payload:",newItem);
          dispatch(addToCart(newItem));
          alert(`${name} added to the cart.`);
        } else {
          console.error("Failed to add item to cart");
          alert("Failed to add item to cart.");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Error adding item to cart.");
      }
    }
  };
  

  return (
    <div className="bg-white h-[20vh] sm:h-[45vh] w-30 sm:w-40 shadow-md hover:shadow-lg hover:shadow-[#A91D3A] transition-shadow duration-300 p-2 rounded-lg">
      {/* Image Section */}
      <figure className="w-full h-25 sm:h-28 flex justify-center items-center mb-0.5">
        <img src={item.image} alt={item.name} className="w-full h-full rounded-md" />
      </figure>
      {/* Card Body */}
      <div className="card-body flex flex-col items-center">
        {/* Title */}
        <h2 className="card-title text-[#A91D3A] text-xs sm:text-sm font-bold line-clamp-1 text-center mb-1">
          {name}
        </h2>
        {/* Price and Button */}
        <div className="text-center space-y-1">
          <div className="font-semibold text-[#A91D3A] text-sm">{price} LKR</div>
          <button
            className="text-xs bg-[#A91D3A] text-[#EEEEEE] border-none hover:bg-[#C73659] hover:scale-105 transition-transform duration-300 rounded-md p-2"
            onClick={handleAddToCart}
          >
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;