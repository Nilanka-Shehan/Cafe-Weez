import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/" className="text-gamboge">
          Home
        </a>
      </li>
      <li>
        <a href="/about" className="text-gamboge">
          About
        </a>
      </li>
      <li>
        <a href="/menu" className="text-gamboge">
          Menu
        </a>
      </li>
      <li>
        <a href="/gallery" className="text-gamboge">
          Gallery
        </a>
      </li>
      <li>
        <a href="/blog" className="text-gamboge">
          Blog
        </a>
      </li>
      <li>
        <a href="/contact" className="text-gamboge">
          Contact
        </a>
      </li>
      <li>
        <a href="/contact" className="text-gamboge">
          Contact
        </a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto bg-black fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div className={`navbar ${isSticky ? "bg-black bg-opacity-10 shadow-lg" : "bg-transparent"} transition-all duration-300`}>
        <div className="flex-1 pl-10">
          <img className="w-12 h-12" src="/logo.jpg" alt="Logo" />
        </div>

        {/* Hamburger Icon for Small Devices */}
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              onClick={() => setIsOpen(!isOpen)}
              role="button"
              className="btn btn-ghost"
            >
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            {isOpen && (
              <div className="fixed inset-0 bg-base-100 z-50 p-4">
                <ul className="menu flex flex-col h-full justify-center items-center text-2xl space-y-9">
                  <button
                    className="btn btn-circle mb-10 border-gamboge text-gamboge"
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </button>
                  {navItems}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* for large devices, navItems display as row */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
