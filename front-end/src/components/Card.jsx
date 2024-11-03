import React from "react";

const Card = ({ item }) => {
  return (
    <div>
      <div className="card bg-gray-200 h-[45vh] sm-low:h-[30vh] sm:h-[70vh] sm-tall:h-[30vh] xl-low:h-[50vh] xl:h-[70vh] w-50 sm-low:w-38 sm:w-50 md:w-60 shadow-xl hover:shadow-2xl">
        <figure className="w-full h-30 sm:h-[15vh] md:h-[35vh]">
          <img
            src={item.image}
            alt=""
            className="object-cover h-full w-full"
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title h-12 sm:h-auto text-black text-auto line-clamp-2">
            {item.name}
          </h2>
          <div className="space-y-3">
            <div className="font-semibold text-blue-800">{item.price} LKR</div>
            <div className="card-actions mb-0 justify-center">
              <button className="image text-[8px] sm:text-lg md:text-lg btn  btn-primary bg-white border-gamboge hover:bg-gamboge hover:text-white px-1 py-1 sm:px-4 sm:py-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
