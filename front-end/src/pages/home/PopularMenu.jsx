import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "../../components/Card";

const cardItems = [
  {
    _id: "642c155b2c4774f05c36eeaa",
    name: "Haddock",
    recipe:
      "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans.",
    image: "https://i.ibb.co/HCrDdk6/img1.png",
    category: "salad",
    price: 14.7,
  },
  {
    _id: "642c155b2c4774f05c36ee74",
    name: "Roast Duck Breast",
    recipe:
      "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    image: "https://i.ibb.co/W5T6Gmj/img3.png",
    category: "popular",
    price: 14.5,
  },
  {
    _id: "642c155b2c4774f05c36ee7c",
    name: "Escalope de Veau",
    recipe:
      "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    image: "https://i.ibb.co/HCrDdk6/img1.png",
    category: "popular",
    price: 14.5,
  },
  {
    _id: "642c155b2c4774f05c36ee7x",
    name: "Roast Duck Breast",
    recipe:
      "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    image: "https://i.ibb.co/qJCmcpC/img2.png",
    category: "popular",
    price: 14.5,
  },
  {
    _id: "642c155b2c4774f05c36ee9e",
    name: "Breton Fish Stew",
    recipe:
      "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
    image: "https://i.ibb.co/qJCmcpC/img2.png",
    category: "pizza",
    price: 12.9,
  },
];

//Arrow buttons functions
const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SimplePreArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const PopularMenu = () => {
  const slider = React.useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    preArrow: <SimplePreArrow />,
  };

  return (
    //Popular Card Items
    <div className="py-10 relative pb-10 bg-white">
      <div className="text-center py-8 text-gamboge">
        <h2 className="font-" style={{ fontFamily: "Dancing Script, cursive" }}>
          Some Text in here
        </h2>
        <h1 className="text-4xl font-bold">Some Text in here</h1>
      </div>
      <div className="py-20">
        <div className="absolute top-40 right-10 m-5 flex">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="image btn p-2 rounded-full ml-5 shadow-2xl text-gamboge bg-white border-gamboge hover:bg-gamboge hover:text-white"
          >
            <FaAngleLeft className="w-8 h-8 p-1" />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="image btn p-2 rounded-full ml-5 shadow-2xl  text-gamboge bg-white border-gamboge hover:bg-gamboge hover:text-white"
          >
            <FaAngleRight className="w-8 h-8 p-1" />
          </button>
        </div>
        <div className="border-white ml-6 lg:ml-12" style={{ borderWidth: "1rem" }}>
          <Slider ref={slider} {...settings} className="card-container px-1">
            {cardItems.map((item) => (
              <div key={item._id} className="px-2 sm-low:px-[0.125rem]">
                <Card item={item} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-col items-center pt-10">
          <button className="image btn bg-white border-gamboge text-gamboge hover:bg-gamboge hover:text-white">
            Check Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularMenu;
