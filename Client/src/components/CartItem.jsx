import React from "react";
import { useDispatch } from "react-redux";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { changeQuantity, removeFromCart } from "../pages/cart/CardSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const axiosSecure = useAxiosSecure();
  const { _id,productId, name, price, image, quantity } = item;
  console.log("item:",item);


  // Function to update cart quantity in backend & Redux
  const updateCartQuantity = async (newQuantity) => {
    try {
      const response = await axiosSecure.put(`/carts/${_id}`, { quantity: newQuantity });
      
      if (response.status === 200) {
        dispatch(changeQuantity({ _id,productId, quantity: newQuantity }));
      } else {
        console.error("Failed to update quantity:", response.data);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Decrease quantity or remove item if 1
  const handleMinusQuantity = async () => {
    if (quantity > 1) {
      await updateCartQuantity(quantity - 1);
    } else {
      await handleRemoveItem();
    }
  };

  // Increase quantity
  const handlePlusQuantity = async () => {
    await updateCartQuantity(quantity + 1);
  };

  // Remove item from cart
  const handleRemoveItem = async () => {
    try {
      console.log(_id)
      const response = await axiosSecure.delete(`/carts/${item._id}`);
      
      if (response.status === 200) {
        dispatch(removeFromCart(item._id));
      } else {
        console.error("Failed to remove item:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-md border-2 border-[#a91d3a]"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#a91d3a]">{name}</h3>
        <p className="mt-2 text-sm font-semibold text-[#a91d3a]">LKR {price * quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-[#ed1b24] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#911733] transition duration-200"
          onClick={handleMinusQuantity}
        >
          -
        </button>
        <span className="font-semibold text-lg text-[#a91d3a]">{quantity}</span>
        <button
          className="bg-[#ed1b24] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#911733] transition duration-200"
          onClick={handlePlusQuantity}
        >
          +
        </button>
      </div>
      <button
        className="bg-[#ed1b24] text-white py-1 px-4 rounded-md mt-2 hover:bg-[#d9161f] transition duration-200"
        onClick={handleRemoveItem}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;