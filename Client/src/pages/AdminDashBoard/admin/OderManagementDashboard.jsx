import { useEffect, useState } from "react";
import {
  FaCartArrowDown,
  FaClipboardCheck,
  FaDollarSign,
  FaShoppingCart,
  FaThList,
} from "react-icons/fa";
import OrderApproval from "../../../components/admin/OrderApproval";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OderManagementDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalOnlineOrders, setTotalOnlineOrders] = useState(0);
  const [totalDiningOrders, setTotalDiningOrders] = useState(0);
  const [bestSellingProduct, setBestSellingProduct] = useState("");
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [approvedOrdersCount, setApprovedOrdersCount] = useState(0);

  const axiosSecure = useAxiosSecure();

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get("/orders");
        const fetchedOrders = Array.isArray(response.data) ? response.data : [];
        setOrders(fetchedOrders);

        // Calculate total earnings
        const totalPrice = fetchedOrders.reduce(
          (sum, order) => sum + (Number(order.totalPrice) || 0),
          0
        );
        setTotalEarned(totalPrice);

        // Calculate online and dining orders
        const onlineOrders = fetchedOrders.filter((order) => order.orderType === "online").length;
        const diningOrders = fetchedOrders.filter((order) => order.orderType === "dining").length;
        setTotalOnlineOrders(onlineOrders);
        setTotalDiningOrders(diningOrders);

        // Calculate Best Selling Product
        const productCounts = {};
        fetchedOrders.forEach((order) => {
          (order.cartItems || []).forEach((item) => {
            if (productCounts[item.productName]) {
              productCounts[item.productName] += item.quantity;
            } else {
              productCounts[item.productName] = item.quantity;
            }
          });
        });

        const bestSeller = Object.keys(productCounts).length > 0 ?
          Object.keys(productCounts).reduce((a, b) =>
            productCounts[a] > productCounts[b] ? a : b
          ) : "N/A";
        setBestSellingProduct(bestSeller);

        // Calculate pending and approved orders
        const pendingOrders = fetchedOrders.filter((order) => order.status === "pending").length;
        const approvedOrders = fetchedOrders.filter((order) => order.status === "approved").length;
        setPendingOrdersCount(pendingOrders);
        setApprovedOrdersCount(approvedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const approveOrder = async(id) => {
    setOrders(
      orders.map((order) =>
        order._id === id ? { ...order, status: "approved" } : order
      )
    );
  };

  return (
    <div className="flex-1 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Manage orders efficiently.
        </p>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Earned */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Earned</h2>
            <p className="text-gray-600 mt-1">LKR {totalEarned}</p>
          </div>
          <FaDollarSign className="text-4xl text-teal-400" />
        </div>

        {/* Total Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Orders</h2>
            <p className="text-gray-600 mt-1">{orders.length} orders</p>
          </div>
          <FaShoppingCart className="text-4xl text-teal-400" />
        </div>

        {/* Best Selling Product */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Best Selling Food
            </h2>
            <p className="text-gray-600 mt-1">{bestSellingProduct || "N/A"}</p>
          </div>
          <FaCartArrowDown className="text-4xl text-indigo-600" />
        </div>
      </div>

      {/* Orders Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Online Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Online Orders</h2>
            <p className="text-gray-600 mt-1">{totalOnlineOrders} orders</p>
          </div>
          <FaClipboardCheck className="text-4xl text-blue-500" />
        </div>

        {/* Dining Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Dining Orders</h2>
            <p className="text-gray-600 mt-1">{totalDiningOrders} orders</p>
          </div>
          <FaClipboardCheck className="text-4xl text-orange-500" />
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Pending Orders</h2>
            <p className="text-gray-600 mt-1">{pendingOrdersCount} orders</p>
          </div>
          <FaThList className="text-4xl text-red-500" />
        </div>

        {/* Approved Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Approved Orders</h2>
            <p className="text-gray-600 mt-1">{approvedOrdersCount} orders</p>
          </div>
          <FaClipboardCheck className="text-4xl text-green-500" />
        </div>
      </div>

      <div className="gap-6">
        {/* Order Approval Section */}
        <OrderApproval
          orders={orders}
          approveOrder={approveOrder}
          setOrders={setOrders}
        />
      </div>
    </div>
  );
};

export default OderManagementDashboard;
