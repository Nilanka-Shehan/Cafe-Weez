import React from "react";
import ReviewCard from "./ReviewCard";

const Fades = () => {
  return (
    <div className="w-full">
      <div className="relative md:p-10 sm:top-1/4 md:top-20 transform -translate-y-1/2 continuous-slide">
        <ReviewCard/>
      </div>
    </div>
  );
};

export default Fades;

// Fades.jsx
// import React from "react";
// import Slider from "react-slick";
// import ReviewCard from "./ReviewCard";

// const Fades = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,      // Enables auto-slide
//     autoplaySpeed: 3000, // Adjusts the delay (in ms) between slides
//     pauseOnHover: true   // Pauses auto-slide on hover
//   };

//   return (
//     <div className="w-full sm:w-auto ml-2">
//       <Slider {...settings}>
//         {/* You can duplicate <ReviewCard /> here or map through an array of data if you have multiple reviews */}
//         <ReviewCard />
//         <ReviewCard />
//         <ReviewCard />
//       </Slider>
//     </div>
//   );
// };

// export default Fades;
