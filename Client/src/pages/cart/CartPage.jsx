import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { removeFromCart } from "../../pages/cart/CardSlice";
import CustomerLiveMap from "../../components/LiveMap/CustomerLiveMap";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, refetch] = useCart();
  const [orderType, setOrderType] = useState("online"); // Default to online order
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    tableNumber: "",
    tableCode: "",
    distance: 0,
  });
  const [displayMap, setDisplayMap] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const dispatch = useDispatch();

  // Fetch cart and product data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await axiosSecure.get(
          `/carts?email=${user.email}`
        );
        //console.log('Cart Response:', cartResponse.data); // Inspect the full response
        if (Array.isArray(cartResponse.data)) {
          setCartItems(cartResponse.data); // If it's an array, set it as cart items
        } else if (
          cartResponse.data &&
          Array.isArray(cartResponse.data.result)
        ) {
          // Check if the response has a 'result' property that contains the array
          setCartItems(cartResponse.data.result);
        } else {
          console.error("Unexpected data structure:", cartResponse.data);
          setCartItems([]); // Default to empty array if structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCartItems([]); // Default to empty array on error
      }
    };

    fetchCartData();
  }, [user.email]); // Ensure it runs when `user.email` changes

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate the total price for cart items
  const calculateTotal = () => {
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const charges =
      orderType === "online"
        ? calculateDeliveryCharges()
        : calculateServiceCharges();
    return parseFloat(cartTotal + charges).toFixed(2);
  };

  // Calculate delivery charges for online orders
  const calculateDeliveryCharges = () => {
    const deliveryChargePerKm = 50; // Example charge per km
    return (parseFloat(formData.distance) || 0) * deliveryChargePerKm;
  };

  // Calculate service charges for dining orders
  const calculateServiceCharges = () => {
    const serviceChargeRate = 0.1; // 10% service charge
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return parseFloat(cartTotal * serviceChargeRate);
  };

  // Handle form submission to place an order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        name: formData.name,
        address: orderType === "online" ? formData.address : undefined,
        phoneNumber: orderType === "online" ? formData.phoneNumber : undefined,
        tableNumber: orderType === "dining" ? formData.tableNumber : undefined,
        tableCode: orderType === "dining" ? formData.tableCode : undefined,
        distance: orderType === "online" ? formData.distance : undefined,
        orderType,
        cartItems: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: calculateTotal(),
      };

      console.log("Order Data:", orderData);

      const response = await axiosSecure.post("/orders", orderData);
      alert("Order placed successfully!");
      console.log("Order Response:", response.data.success);
      if (response.data.success) {
        const response = await axiosSecure.delete(`/carts?email=${user.email}`);
        response.data.cartItems.map((item) =>
          dispatch(removeFromCart(item._id))
        );
        setFormData({
          name: "",
          address: "",
          phoneNumber: "",
          tableNumber: "",
          tableCode: "",
          distance: 0,
        });
        //dispatch(removeFromCart(item._id))
        refetch();
      }

      dispatch({ type: "RESET_CART" });
    } catch (error) {
      console.error(
        "Failed to place order:",
        error.response?.data || error.message
      );
      alert(
        "Failed to place the order. Please check your inputs and try again."
      );
    }
  };

  const displaymap = () => {
    setDisplayMap(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-500 py-10 px-5">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center p-5 border-b">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg" // Replace with your actual logo path
                alt="Logo"
                className="w-12 h-12 object-cover"
              />
              <h2 className="text-3xl text-[#a91d3A] font-semibold">
                ORDER DETAILS
              </h2>
            </div>
            <Link
              to="/customer"
              className="text-[#a91d3A] text-xl hover:text-[#9e1832] transition"
            >
              Back
            </Link>
          </div>

          <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div>
              <div className="flex gap-4">
                <button
                  onClick={() => setOrderType("online")}
                  className={`py-2 px-4 rounded-lg ${
                    orderType === "online"
                      ? "bg-[#a91d3A] text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  Online Order
                </button>
                <button
                  onClick={() => setOrderType("dining")}
                  className={`py-2 px-4 rounded-lg ${
                    orderType === "dining"
                      ? "bg-[#a91d3A] text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  Dining Order
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Common Fields */}
                <div>
                  <label className="block text-sm font-semibold text-[#a91d3A]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>

                {orderType === "online" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-[#a91d3A]">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#a91d3A]">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#a91d3A]">
                        Delivery Distance (km)
                      </label>
                      <input
                        type="number"
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-4 py-2"
                      />
                      <button
                        className="w-full py-3 bg-[#a91d3A] text-white rounded-lg"
                        onClick={displaymap}
                      >
                        map
                      </button>
                    </div>
                  </>
                )}

                {orderType === "dining" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-[#a91d3A]">
                        Table Number
                      </label>
                      <input
                        type="number"
                        name="tableNumber"
                        value={formData.tableNumber}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#a91d3A]">
                        Table Code
                      </label>
                      <input
                        type="text"
                        name="tableCode"
                        value={formData.tableCode}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#a91d3A] text-white rounded-lg"
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>

            {/* Cart Items */}
            <div>
              <h3 className="text-xl font-semibold text-[#a91d3A] mb-4">
                Your Cart
              </h3>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">
                  Your cart is empty. Please add some items.
                </p>
              ) : (
                <div>
                  {cartItems.map((item, key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center border-b py-3"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image} // Assuming the cart items have an image field
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span>{item.quantity}</span> x{" "}
                        <span>LKR {item.price}</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span>LKR {calculateTotal()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {displayMap && (
        <div className="fixed inset-0 bg-white z-50 p-5">
          <h2 className="text-xl font-semibold mb-4">Live Map</h2>
          <div className="h-[500px] w-full rounded border shadow">
            {/* Replace with your map component */}
            <CustomerLiveMap/>
          </div>
          <button
            onClick={() => setDisplayMap(false)}
            className="mt-4 bg-[#a91d3A] text-white px-4 py-2 rounded"
          >
            Close Map
          </button>
        </div>
      )}
    </>
  );
};

export default CartPage;
