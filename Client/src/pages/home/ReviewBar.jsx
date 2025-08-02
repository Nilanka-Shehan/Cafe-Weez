import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ReviewCard from "../../components/ReviewCard";
import { useCallback, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ReviewBar = () => {
  const axiosPublic = useAxiosPublic();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
  };
  const staticReviews = [
    {
      name: "Nilanka",
      title: "Amazing Food Items",
      content:
        "Designed to be the Culinary epicenter, We try to uphold the traditions of the Local Household while bringing out the flavors of Sri Lanka with a bounty of fresh seasonal ingredients. We take extra care to deliver fresh farm produce to a local classy table cuisine with an emphasis on seasonal & locally sourced ingredients and with the freshest Seafood.",
    },
    {
      name: "Chathura",
      title: "Great Experience",
      content:
        "The food was exceptional and the service was top-notch. I highly recommend this place to anyone looking for a great dining experience.",
    },
    {
      name: "Saranga",
      title: "Delicious and Fresh",
      content:
        "I loved the variety of dishes available. Everything was fresh and tasted amazing. The ambiance was also very pleasant.",
    },
  ];
  const [reviews, setReviews] = useState(staticReviews);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axiosPublic.get("/reviews/accepted-reviews");
      if (Array.isArray(res.data) && res.data.length > 0) {
        setReviews((prevReviews) => {
          // Combine old and new
          const combined = [...prevReviews, ...res.data];
          // Remove duplicates by _id (or by title if no _id)
          const unique = combined.filter((review, index, self) =>
            review._id
              ? self.findIndex((r) => r._id === review._id) === index
              : self.findIndex((r) => r.title === review.title) === index
          );
          return unique;
        });
      }
    } catch (error) {
      console.error("There was an error fetching reviews:", error);
    }
  }, [axiosPublic]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    console.log("Updated reviews:", reviews);
  }, [reviews]);

  return (
    <div className="bg-[#151515] p-10">
      <div className="flex flex-col lg:flex-row lg:space-x-10 md:justify-center h-[105vh] sm-low:h-[80vh] sm:h-[65vh] md:h-[95vh] lg:h-[80vh] lg-tall:h-[40vh] xl:h-[110vh] xl-low:h-[80vh] p-10">
        <div className="lg:w-3/5">
          <img
            src="/other/food1.jpeg"
            alt=""
            className="h-full w-full border-black"
            style={{ borderWidth: "2px" }}
          />
        </div>
        <div className="flex mt-10 lg:mt-0 lg:w-[455px] lg:items-center">
          <div className="slider-container w-full">
            <Slider {...settings}>
              {reviews.map((review, index) => (
                <div key={index}>
                  <ReviewCard review={review}/>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBar;
