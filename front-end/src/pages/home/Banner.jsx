import React, { useEffect, useState } from "react";

const images = [
  "/Images/jpeg1.jpeg",
  "/Images/jpeg2.jpeg",
  "/Images/jpeg3.jpeg",
  "/Images/jpeg4.jpeg",
  "/Images/jpeg5.jpeg",
  "/Images/jpeg6.jpeg",
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
      }, 2000); // Time for fade out (must match the CSS transition duration)
    }, 8000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[60vh] lg:h-screen md:h-[80vh] sm:h-[50vh]  overflow-hidden bg-transparent">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className={`absolute transition-opacity duration-2000 ease-in-out ${
          fade ? "opacity-90" : "opacity-76"
        }`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} // Adjust size as needed
      />
      <div className="absolute text-white text-center space-y-6">
        <h2 className="font-" style={{ fontFamily: "Dancing Script, cursive" }}>
          Some Text in here
        </h2>
        <h1 className="text-4xl font-bold">Some Text in here</h1>
        <p className="mt-2 text-lg font-semibold">Some Text in here</p>
      </div>
    </div>
  );
};

export default Banner;
