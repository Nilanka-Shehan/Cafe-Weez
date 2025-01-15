import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAth";
import useRoleCheck from "../hooks/useRoleCheck";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const { user, logout } = useAuth();
  const [hasAccess] = useRoleCheck(["admin","owner"]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/contact-us", label: "Contact us" },
    { path: "/menu", label: "Menu" },
  ];

  const handleLogout = () => logout();

  const renderNavItems = () =>
    navLinks.map((link) => (
      <li key={link.path}>
        <Link
          to={link.path}
          className="text-[#ed1b24] hover:text-[#A91D3A] transition-colors duration-200 font-medium"
        >
          {link.label}
        </Link>
      </li>
    ));

  return (
    <header
      className={`${
        isSticky ? "bg-[#151515] shadow-lg" : "bg-transparent"
      } fixed w-full z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 lg:px-10 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="Company Logo" className="w-12 h-12" />
          <span className="ml-3 text-eeeeee font-bold text-lg text-[#ed1b24] text-[30px] font-sans">
            WEEZ CAFE
          </span>
        </Link>

        {/* Nav Items for Large Screens */}
        <nav className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">{renderNavItems()}</ul>
          {user ? (
            <>
              <Link
                to="/cart-page"
                className="btn btn-ghost btn-circle lg:ml-5"
              >
                <div className="indicator text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item bg-white text-black">
                    5
                  </span>
                </div>
              </Link>
              <div className="dropdown dropdown-end w-10 rounded-full">
                <div tabIndex={0} role="button">
                  {user.photoURL &&
                    (user.photoURL.startsWith("http") ? (
                      <img
                        alt={`Avatar of ${user.username}`}
                        src={user.photoURL}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 bg-gamboge rounded-full">
                        <span className="text-lg font-bold text-white">
                          {user.photoURL}
                        </span>
                      </div>
                    ))}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-rose-red text-white font-bold rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                  {hasAccess && (
                    <li>
                      <a href="/admin-dashboard">Admin-Dashboard</a>
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="py-2 px-4 bg-[#ed1b24] text-white  hover:bg-[#C73659] transition duration-200 rounded-2xl p-40 font-medium"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="lg:hidden p-2 text-eeeeee focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="fixed inset-0 bg-[#151515] flex flex-col items-center justify-center space-y-6 text-eeeeee z-50 lg:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-eeeeee text-3xl focus:outline-none"
              aria-label="Close Menu"
            >
              &times;
            </button>
            <ul className="flex flex-col items-center space-y-4 text-lg">
              {renderNavItems()}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
