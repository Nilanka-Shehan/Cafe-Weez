// components/OrderApproval.jsx
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OrderApproval = ({ orders, setOrders, approveOrder }) => {
  const axiosSecure = useAxiosSecure();

  // Delete an order
  const deleteOrder = async (id) => {
    try {
      await axiosSecure.delete(`/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      alert("Order deleted successfully!");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete the order.");
    }
  };

  //Approve an order
  const orderApprovel = async (id) => {
    try {
      await axiosSecure.put(`/orders/${id}`,{status:'approved'});
      approveOrder(id);
      alert("Order is Approved");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

      {/* Order List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {order.name}
            </h3>
            <div className="mt-4">
              {/* Display Order ID and Status */}
              <p className="text-gray-700">Order ID: {order._id}</p>
              <p className="text-gray-700">
                {" "}
                Status:
                <span
                  className={`text-${
                    order.status === "approved" ? "green" : "yellow"
                  }-500`}
                >
                  {order.status}
                </span>
              </p>

              {/* Order Details */}
              <div className="mt-4">
                <p className="text-gray-700">Address: {order.address}</p>
                <p className="text-gray-700">Phone: {order.phoneNumber}</p>
                <p className="text-gray-700">Order Type: {order.orderType}</p>
                <p className="text-gray-700">
                  Payment Method: {order.paymentMethod}
                </p>
                <p className="text-gray-700">
                  Total Price: LKR {order.totalPrice}
                </p>
                <p className="text-gray-700">
                  Delivery Date:{" "}
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-row justify-between">
                <div>
                  {order.status === "pending" ? (
                    <button
                      onClick={() => orderApprovel(order._id)}
                      className="px-5 py-2 bg-red text-white rounded-md hover:bg-red-700 transition m-2"
                    >
                      Pending
                    </button>
                  ) : (
                    <h3 className="font-bold text-green">Approved</h3>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="px-5 py-2 bg-red text-white rounded-md hover:bg-red-700 transition m-2"
                  >
                    Delete Order
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Cart Items:</h4>
                <div className="space-y-2 mt-2">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="bg-gray-100 p-3 rounded-md">
                      <p className="text-gray-700">Food: {item.productName}</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      <p className="text-gray-700">Price: LKR {item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderApproval;
