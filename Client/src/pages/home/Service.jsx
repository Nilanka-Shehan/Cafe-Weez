import React from "react";

const Service = () => {
  return (
    <div className="bg-white p-6 flex flex-col lg:flex-row justify-center items-center">
      {/* Left Section: Image */}
      <div className="lg:w-1/4 flex justify-center items-center">
        <img
          src="/blog/blog1.jpg"
          alt="Coffee"
          className="rounded-xl shadow-lg w-3/4 lg:w-full object-cover"
        />
      </div>

      {/* Right Section: Text Content */}
      <div className="lg:w-1/2 mt-6 lg:mt-0 text-center  px-4 lg:px-10">
        <h2
          className="text-4xl font-semibold mb-4 text-[#A91D3A]"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Our Services
        </h2>
        <ul className="space-y-3 text-lg text-[#A91D3A]">
          <li>Dining and Online Orders</li>
          <li>Delivery Available</li>
          <li>Specially Serving the Kandy Area</li>
        </ul>
      </div>
    </div>
  );
};

export default Service;