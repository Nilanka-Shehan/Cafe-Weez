import React from "react";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaShoppingBag,
  FaUsers
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import useRoleCheck from "../hooks/useRoleCheck";
import AdminNavbar from "../pages/AdminDashBoard/admin/AdminNavbar";
import Login from "../pages/Login";

// Shared links
const sharedLinks = (
  <>
    <li>
      <Link to="/" className="mt-3">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li>
      <Link to="/">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/admin-dashboard/customer-support">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

const AdminDashboardLayout = () => {
  const [isAdmin, role, isAdminLoading] = useRoleCheck(["admin"]);
  
  if (isAdminLoading) {
    return <div>Loading...</div>; // Display loading state while admin status is being checked
  }

  return (
    <>
    <AdminNavbar/>
      {isAdmin === false ? (
        <Login /> // If the user is not an admin, render the Login component
      ) : (
        <div className="drawer sm:drawer-open pt-20">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
            
            <div className="flex justify-between items-center mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden bg-rose-red text-white"
              >
                <MdDashboardCustomize />
              </label>
              
            </div>
            <Outlet />
          </div>
          <div className="drawer-side text-secondary">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-80 p-4 bg-rose-red text-white">
              {/* Sidebar content here */}
              <li>
                <Link to="/admin-dashboard">
                  <MdDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/manage-bookings">
                  <FaShoppingBag />
                  Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/add-menu">
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/manage-items">
                  <FaEdit />
                  Manage Items
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/users">
                  <FaUsers />
                  All Users
                </Link>
              </li>
              {sharedLinks}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardLayout;
