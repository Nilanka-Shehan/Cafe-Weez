import React from "react";
import Banner from "./Banner";
import BlogBar from "./BlogBar";
import PopularMenu from "./PopularMenu";
import ReviewBar from "./ReviewBar";
import Service from "./Service";

const Home = () => {
  return (
    <>
      <main className="flex-1 pt-20 md:pt-18 w-full bg-white ">
        <Banner />

        <PopularMenu />
        <Service />
        <ReviewBar />

        <BlogBar />
      </main>
    </>
  );
};

export default Home;
