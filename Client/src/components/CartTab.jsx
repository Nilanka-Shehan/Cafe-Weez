import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleStatusTab } from '../pages/cart/CardSlice';
import CartItem from './CartItem';

const CartTab = () => {
  const carts = useSelector((store) => store.card.cart.items);
  const statusTab = useSelector((store) => store.card.cart.statusTab);
  const dispatch = useDispatch();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  // Debugging: Check if cart items have unique IDs
  //console.log("Cart Items:", carts);

  return (
    <div
      className={`fixed top-0 right-0 bg-white shadow-xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-500 rounded-lg ${
        statusTab === false ? 'translate-x-full' : ''
      } sm:w-80 md:w-96 xl:w-1/3`}
    >
      <h2 className="p-5 text-[#a91d3A] text-2xl font-semibold">Shopping Cart</h2>

      {/* Cart Items Section */}
      <div className="p-5 overflow-y-auto space-y-4">
        {carts.length === 0 ? (
          <p className="text-center text-[#a91d3a]">Your cart is empty.</p>
        ) : (
          carts.map((item, index) => (
            <CartItem key={item._id || item.productId || index} item={item} />
          ))
        )}
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-2 gap-2 p-5">
        <button
          className="bg-[#a91d3a] text-white py-2 rounded-lg hover:bg-[#9e1832] transition duration-200"
          onClick={handleCloseTabCart}
        >
          CLOSE
        </button>
        <button className="bg-[#ed1b24] text-white py-2 rounded-lg hover:bg-[#d9161f] transition duration-200">
          <Link to="/cart-page">NEXT</Link>
        </button>
      </div>
    </div>
  );
};

export default CartTab;