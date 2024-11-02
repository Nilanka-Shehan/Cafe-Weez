import React from "react";

const ReviewCard = () => {
  return (
    <div className="card bg-gamboge text-primary-content w-full  sm:w-[calc(100%-3px)] md:min-h-[340px] p-1 rounded-3xl shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">Nilanka</h2>
        <h4 className="font-semibold text-white text-lg mb-2">Amazing Food Items</h4>
        <p className="line-clamp-6 text-white text-sm">
          Designed to be the Culinary epicenter, We try to uphold the traditions of the Local Household while bringing out the flavors of Sri Lanka with a bounty of fresh seasonal ingredients. We take extra care to deliver fresh farm produce to a local classy table cuisine with an emphasis on seasonal & locally sourced ingredients and with the freshest Seafood.
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;

