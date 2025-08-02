import React from "react";

const images = [
  "/blog/blog1.jpg",
  "/blog/blog2.jpg",
  "/blog/blog3.jpg",
  "/blog/blog4.jpg",
  "/blog/blog5.jpg",
  "/blog/blog6.jpg",
];

const BlogBar = () => {
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-center py-10">
        <h1 className="font-bold text-4xl text-[#A91D3A]">GALLERY</h1>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-20 pt-10 px-4">
        {/* Mapping the images to display them in a grid */}
        {images.map((image, index) => (
          <div key={index} className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
            <img
              src={image}
              alt={`Blog ${index + 1}`}
              className="w-[80%] h-[80%] object-cover rounded-3xl border-4 border-[#EEEEEE] shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto" // Adjusted image size
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogBar;