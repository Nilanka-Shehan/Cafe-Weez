import React from "react";
import { FaClock, FaCoffee, FaUsers } from "react-icons/fa";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const About = () => {
  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50 w-full  shadow-md">
        <NavBar />
      </div>
    
    <div className=" bg-white min-h-screen pt-20">
      {/* Header Section */}
      <header className="bg-[#151515] text-white py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">Our Story, Our Team, and Our Services</p>
        </div>
      </header>

      {/* Our Journey Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#A91D3A]">Our Journey</h2>
        <div className="mt-6 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700">
            We started with a simple vision: to bring the taste of local Sri Lankan
            dishes to a modern dining experience. Over the years, we've created a
            space where food lovers can come together to enjoy freshly made, seasonal
            dishes. Our journey has been one of constant learning, growth, and a true
            commitment to bringing our customers the best dining experience.
          </p>
        </div>
      </section>

      {/* Total Working Officers Section */}
      <section className="py-16 px-6 md:px-16 bg-[#151515] text-white">
        <h2 className="text-3xl font-bold text-center text-[#A91D3A]">Our Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <FaUsers className="text-6xl text-[#A91D3A]" />
            <h3 className="mt-4 text-xl font-bold">200+</h3>
            <p className="text-lg">Team Members</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCoffee className="text-6xl text-[#A91D3A]" />
            <h3 className="mt-4 text-xl font-bold">5+</h3>
            <p className="text-lg">Years in Service</p>
          </div>
          <div className="flex flex-col items-center">
            <FaClock className="text-6xl text-[#A91D3A]" />
            <h3 className="mt-4 text-xl font-bold">24/7</h3>
            <p className="text-lg">Open All Week</p>
          </div>
        </div>
      </section>

      {/* Cafe Main Members Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#A91D3A]">Meet the Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Team Member 1"
              className="w-40 h-40 object-cover rounded-full border-4 border-[#A91D3A]"
            />
            <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
            <p className="text-lg text-gray-700">Founder & CEO</p>
            <p className="mt-2 text-center text-gray-600">
              John founded the cafe with a mission to serve the best traditional Sri Lankan dishes.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Team Member 2"
              className="w-40 h-40 object-cover rounded-full border-4 border-[#A91D3A]"
            />
            <h3 className="mt-4 text-xl font-semibold">Jane Smith</h3>
            <p className="text-lg text-gray-700">Head Chef</p>
            <p className="mt-2 text-center text-gray-600">
              Jane brings authentic Sri Lankan flavors to every dish, focusing on fresh, local ingredients.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Team Member 3"
              className="w-40 h-40 object-cover rounded-full border-4 border-[#A91D3A]"
            />
            <h3 className="mt-4 text-xl font-semibold">Mark Lee</h3>
            <p className="text-lg text-gray-700">Operations Manager</p>
            <p className="mt-2 text-center text-gray-600">
              Mark ensures smooth operations, from customer service to kitchen management.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 px-6 md:px-16 bg-[#151515] text-white">
        <h2 className="text-3xl font-bold text-center text-[#A91D3A]">Our Services</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white text-[#151515] p-6 rounded-lg shadow-lg">
            <FaCoffee className="text-5xl text-[#A91D3A]" />
            <h3 className="mt-4 text-xl font-semibold">Catering</h3>
            <p className="text-lg mt-2 text-center">
              We offer customized catering services for events, parties, and corporate gatherings.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white text-[#151515] p-6 rounded-lg shadow-lg">
            <FaUsers className="text-5xl text-[#A91D3A]" />
            <h3 className="mt-4 text-xl font-semibold">Private Dining</h3>
            <p className="text-lg mt-2 text-center">
              Enjoy an exclusive dining experience in our private rooms with personalized service.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white text-[#151515] p-6 rounded-lg shadow-lg">
            <FaClock className="text-5xl text-[#A91D3A]" />
            <h3 className="mt-4 text-xl font-semibold">24/7 Service</h3>
            <p className="text-lg mt-2 text-center">
              Our cafe is open around the clock to serve you the best Sri Lankan dishes anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About;