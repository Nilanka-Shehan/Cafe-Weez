import { createSlice } from "@reduxjs/toolkit";

// Create the slice for the menu and cart
const cardSlice = createSlice({
  name: "card",
  initialState: {
    menu: {
      items: [], // Initialize the menu items as an empty array
    },
    cart: {
      items: [], // Items in the cart
      statusTab: false, // Track cart tab visibility
    },
  },
  reducers: {
    // Set menu items in the Redux store
    setMenuItems: (state, action) => {
      state.menu.items = action.payload;
    },

    // Add product to the cart (or increase quantity if already added)
    addToCart: (state, action) => {
      //console.log("Action payload:",action.payload)
      const { productId, price, name,_id,image } = action.payload;
      const existingItem = state.cart.items.find((item) => item.productId === productId);

      if (existingItem) {
        // If the product is already in the cart, increase the quantity and update the total price
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        // Otherwise, add it as a new item
        state.cart.items.push({
          _id,
          productId,
          price,
          name,
          image,
          quantity: 1,
          totalPrice: price, // Set initial total price for the new product
        });
      }
    },

    // Change quantity of a product in the cart
    changeQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cart.items.find((item) => item._id === _id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.price; // Recalculate total price
      } else if (item && quantity === 0) {
        // Remove the item if quantity is set to 0
        state.cart.items = state.cart.items.filter((item) => item._id !== _id);
      }
    },

    // Remove a product from the cart
    removeFromCart: (state, action) => {
      const _id = action.payload;
      state.cart.items = state.cart.items.filter((item) => item._id !== _id);
    },

    // Toggle cart tab visibility
    toggleStatusTab: (state) => {
      state.cart.statusTab = !state.cart.statusTab;
    },
  },
});

// Export the actions
export const {
  setMenuItems,
  addToCart,
  changeQuantity,
  removeFromCart,
  toggleStatusTab,
} = cardSlice.actions;

// Export the reducer
export default cardSlice.reducer;
