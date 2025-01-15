import React, { useEffect, useState } from "react";

const images = [
  "/Images/jpeg1.jpeg",
  "/Images/jpeg2.jpeg",
  "/Images/jpeg3.jpeg",
  "/Images/jpeg4.jpeg",
  "/Images/jpeg5.jpeg",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Start fading out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // Fade in the new image
      }, 1000); // Duration of fade out matches CSS transition
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[30vh] lg:h-screen md:h-[30vh] sm:h-[50vh] overflow-hidden bg-[#151515]">
      {/* Background Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay Text */}
      <div className="absolute text-center space-y-6 px-4">
        <h2
          className="text-lg font-medium text-[#EEEEEE] drop-shadow-[0_1px_3px_#000]"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Welcome to
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-[#ED1B24] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ">
          WEEZ CAFE
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-[#EEEEEE] drop-shadow-[0_1px_3px_#000] border-white">
          Choose Your Favors
        </p>
      </div>
    </div>
  );
};

export default Banner;