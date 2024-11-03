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
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row lg:space-x-10 md:justify-center h-[105vh] sm-low:h-[80vh] sm:h-[65vh] md:h-[95vh] lg:h-[80vh] lg-tall:h-[40vh] xl:h-[110vh] xl-low:h-[80vh] p-10">
        <div className="lg:w-3/5">
          <img src="/other/food1.jpeg" alt="" className="h-full w-full border-black" style={{borderWidth : "2px"}}/>
        </div>
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
