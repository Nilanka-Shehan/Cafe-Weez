import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAth";

const NavBar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => logout();

  return (
    <header
      className={`${
        isSticky ? "hidden" : "bg-[#151515] shadow-lg"
      } fixed w-full z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 lg:px-10 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/admin-dashboard" className="flex items-center">
          <img src="/logo.jpg" alt="Company Logo" className="w-12 h-12" />
          <span className="ml-3 text-eeeeee font-bold text-lg text-[#ed1b24] text-[30px] font-sans">
            WEEZ CAFE
          </span>
        </Link>
        <div className="flex flex-row gap-8">
        <img
          alt={`Avatar of ${user.username}`}
          src={user.photoURL}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
        <button
          onClick={handleLogout}
          className="btn bg-rose-red hover:bg-carmine text-white"
        >
          Logout
        </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
