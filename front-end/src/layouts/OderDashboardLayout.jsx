import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import useRoleCheck from "../hooks/useRoleCheck";
import Login from "../pages/Login";

// Shared links
const sharedLinks = (
  <>
    <ul>
      <Link to="/" className="flex flex-row items-center gap-2 mt-3">
        <MdDashboard /> Home
      </Link>
    </ul>
    <ul>
      <Link to="/menu" className="flex flex-row items-center gap-2">
        <FaCartShopping /> Menu
      </Link>
    </ul>
  </>
);

const OrderDashboardLayout = () => {
  const [hasAccess, isAdminLoading] = useRoleCheck(["admin", "cashier"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  if (isAdminLoading) {
    return <div>Loading...</div>; // Display loading state while admin status is being checked
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  return (
    <>
      {hasAccess === false ? (
        <Login /> // If the user is not an admin, render the Login component
      ) : (
        <div className="flex">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="w-60 border-2 border-black h-screen">
              <div className="flex flex-row items-center bg-red">
                <img src="/logo.jpg" alt="" className="w-20"/>
                <h3 className="pl-5">Order Details</h3>
              </div>
              <div className="bg-green gap-y-3">{sharedLinks}</div>
            </div>
          )}

          {/* Content */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-0" : "ml-0"
            }`}
          >
            <div className="flex justify-between items-center p-4 bg-blue-900 text-white">
              <button
                className="btn btn-primary"
                onClick={toggleSidebar}
                aria-label="Open Sidebar"
              >
                <MdDashboardCustomize />
                {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
              </button>
              <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white">
                <FaRegUser />
                Logout
              </button>
            </div>
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDashboardLayout;
