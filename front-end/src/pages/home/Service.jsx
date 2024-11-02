import React from "react";

const Service = () => {
  return (
    <div className="relative p-4  overflow-hidden">
      <img
        src="/Images/RiceAndKottu.jpg"
        alt=""
        className="w-full h-auto" // Ensure the image takes full width with auto height
        style={{ objectFit: "cover" }} // Maintain the aspect ratio
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-start text-white text-center space-y-6 py-20 px-10">
        <h2
          className="text-white"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Some Text in here
        </h2>
        <h1 className="text-4xl font-bold ">Some Text in here</h1>
        <p className="mt-2 text-lg font-semibold">Some Text in here</p>
      </div>
    </div>
  );
};

export default Service;
