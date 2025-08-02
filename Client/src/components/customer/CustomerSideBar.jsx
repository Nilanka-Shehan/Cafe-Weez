import React from "react";
import { FaClipboardList, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAth";

const CustomerSidebar = () => {
  const navLinks = [
    { path: "/customer", label: "Oder Food ", icon: <FaClipboardList /> },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  const renderNavItems = () =>
    navLinks.map((link) => (
      <li key={link.path} className="flex items-center space-x-2">
        <span className="text-white text-lg">{link.icon}</span>
        <Link
          to={link.path}
          className="text-white hover:text-teal-400 transition-colors duration-200 font-medium py-2 px-4 rounded-md"
        >
          {link.label}
        </Link>
      </li>
    ));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-gradient-to-r from-[#a91d3a] to-[#c73659] flex flex-col justify-between py-6 px-4">
      {/* Navigation Links in Sidebar */}
      <nav>
        <ul className="space-y-6">{renderNavItems()}</ul>
      </nav>

      {/* Footer Section */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-[#ed1b24] text-white rounded-md hover:bg-[#C73659] transition duration-200 flex items-center space-x-2"
        >
          <FaSignInAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
