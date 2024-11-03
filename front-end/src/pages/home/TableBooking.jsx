import React from "react";

const TableBooking = () => {
  return (
    <div className="p-[1rem] md:p-[4rem] bg-white">
      <div className="bg-gamboge">
        <div>
          <h1 className="flex justify-center text-white font-bold pt-12 text-4xl">
            Book A Table
          </h1>
          <div
            className="bg-white border-gamboge"
            style={{ borderWidth: "4rem" }}
          >
            <form className="border-white" style={{ borderWidth: "2rem" }}>
              {/* Row1 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-between">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="border-b border-black bg-white focus:outline-none w-full"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="border-b border-black bg-white focus:outline-none w-full"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone*"
                  className="border-b border-black bg-white focus:outline-none w-full"
                  required
                />
              </div>

              {/* Row2 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-between py-5">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY*"
                  className="border-b border-black bg-white focus:outline-none w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Time*"
                  className="border-b border-black bg-white focus:outline-none w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Person*"
                  className="border-b border-black bg-white focus:outline-none w-full"
                  required
                />
              </div>

              {/* Row3 */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Message*"
                  className="border-b border-black bg-white focus:outline-none"
                  required
                />
              </div>

              {/*error*/}
              {/*Login button*/}
              <div className="mt-12 flex justify-center">
                <button className="image btn bg-white border-gamboge text-gamboge hover:bg-gamboge hover:text-white">Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
