import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ReviewCard from "../../components/ReviewCard";

const ReviewBar = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-[#151515] P-10 ">
       <div className="flex justify-center py-5">
        <h1 className="font-bold text-4xl text-white">Feed backs</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-10 md:justify-center h-[50vh] sm:h-[80vh] md:h-[35vh] lg:h-[40vh] xl:h-[60vh] p-10">
       
        {/* Left Image Section */}
        <div className="lg:w-3/5 h-full">
          <img
            src="/other/food1.jpeg"
            alt="Food"
            className="h-full w-full object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right Slider Section */}
        <div className="flex mt-10 lg:mt-0 lg:w-[455px] lg:items-center">
          <div className="slider-container w-full">
            <Slider {...settings}>
              <div>
                <ReviewCard />
              </div>
              <div>
                <ReviewCard />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBar;