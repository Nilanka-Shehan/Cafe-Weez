import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import FoodCard from "../../components/FoodCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropTypes from "prop-types";
const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#A91D3A",
        borderRadius: "50%",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <FaAngleRight style={{ color: "white" }} />
    </div>
  );
};

SimpleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const SimplePreArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#B92D50",
        borderRadius: "50%",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <FaAngleLeft style={{ color: "white" }} />
    </div>
  );
};

SimplePreArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const PopularMenu = () => {
  const slider = React.useRef(null);
  const [cardItems, setCardItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axiosPublic.get("/menu");
        const popularItems = Array.isArray(response.data) ? response.data : [];
        setCardItems(popularItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the menu:", error);
        setCardItems([]); // Ensure it's always an array
        setLoading(false);
      }
    };

    fetchMenu();
  }, [axiosPublic]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    preArrow: <SimplePreArrow />,
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-[#A91D3A]">Loading...</div>
    );
  }

  return (
    <div className="py-10 relative pb-10 bg-gray-100">
      <div className="text-center py-8 text-[#A91D3A]">
        <h2 className="font-" style={{ fontFamily: "Dancing Script, cursive" }}>
          MOST POPULAR FOODS
        </h2>
        <h1 className="text-4xl font-bold">Choose Your Favorite</h1>
      </div>
      <div className="py-20">
        {/* Arrow Navigation */}
        <div className="absolute top-40 right-10 m-5 flex">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="image btn p-2 rounded-full ml-5 shadow-2xl text-[#A91D3A] bg-gray border-[#A91D3A] hover:bg-[#A91D3A] hover:text-white"
          >
            <FaAngleLeft className="w-8 h-8 p-1" />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="image btn p-2 rounded-full ml-5 shadow-2xl text-[#B92D50] bg-gray border-[#B92D50] hover:bg-[#B92D50] hover:text-white"
          >
            <FaAngleRight className="w-8 h-8 p-1" />
          </button>
        </div>

        {/* Slider Container */}
        <div className="ml-6 lg:ml-12">
          {/* <Slider ref={slider} {...settings} className="card-container px-1">
            {cardItems.map((item) => (
              <div key={item._id} className="px-4 sm-low:px-1">
                 <FoodCard item={item} />
              </div>
            ))}
          </Slider> */}
          <Slider ref={slider} {...settings} className="card-container px-1">
            {cardItems.map((item) => (
              <div key={item._id} className="px-2 sm-low:px-1">
                {" "}
                {/* Reduced padding */}
                <FoodCard item={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PopularMenu;
