import React from "react";

const DriverNavbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div>
        <div className="flex items-center space-x-4">
          {/* Logo and Title */}
          <img src="/logo.jpg" alt="Logo" className="w-12 h-12" />
          <h1 className="md:text-3xl font-bold">Driver Dashboard</h1>
        </div>
        {/* Additional Navbar Items can go here */}
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-white flex flex-col items-center">
          <h3 className="md:text-2xl">John Doe</h3>
          <h6 className="md:text-xl">ABC-4153</h6>
        </div>
        <div>
          <img
            src="/peofile.jpeg"
            alt="Profile"
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DriverNavbar;
