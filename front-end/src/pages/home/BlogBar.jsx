import React from "react";

const BlogBar = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-center py-10">
        <h1 className="font-bold text-4xl text-blue-600">FROM THE BLOGS</h1>
      </div>
      <div className="pb-20 pt-10 space-y-20 flex flex-col items-center">
        <div className="image w-3/4 md:h-screen xl:h-[150vh]" >
          <img src="/blog/blog6.jpeg" alt="" className="w-full h-full border-black" style={{borderWidth:"3px"}} />
        </div>
        <div className="image w-3/4 md:h-screen xl:h-[150vh]">
          <img src="/blog/blog7.jpeg" alt="" className="w-full h-full border-black" style={{borderWidth:"3px"}} />
        </div>
      </div>
    </div>
  );
};

export default BlogBar;
