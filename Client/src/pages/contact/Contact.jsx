import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import NavBar from "../../components/NavBar";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Contact = () => {
  const axiosPublic = useAxiosPublic();

  const [inputBookFormValue, setInputBookFormValue] = useState({
    name: "",
    email: "",
    contactNo: "",
    date: "",
    time: "",
    event: "",
  });

  const handleBookingOnChange = (e) => {
    const { name, value } = e.target;
    setInputBookFormValue({
      ...inputBookFormValue,
      [name]: value,
    });
  };

  const [inputMessageForm, setInputMessageForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleMessagingOnChange = (e) => {
    const { name, value } = e.target;
    setInputMessageForm({
      ...inputMessageForm,
      [name]: value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    await axiosPublic.post("/bookings", inputBookFormValue);
    //After submit reset valuse
    setInputBookFormValue({
      name: "",
      email: "",
      contactNo: "",
      date: "",
      time: "",
      event: "",
    });
    alert("Your request has been sent!");
  };

  const handleMessaging = async (e) => {
    e.preventDefault();
    await axiosPublic.post("/messages", inputMessageForm);
    //After submit reset valuse
    setInputMessageForm({
      name: "",
      email: "",
      message: "",
    });
    alert("Your message has been sent!");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full  shadow-md">
        <NavBar />
      </div>

      <div className=" bg-white min-h-screen pt-20">
        {/* Header Section */}
        <header className="bg-[#151515] text-white py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-2 text-lg">We're here to help. Get in touch!</p>
          </div>
        </header>

        {/* Contact Information Section and table booking */}
        <section className="py-16 px-6 md:px-16 bg-white space-y-10">
          <h2 className="text-3xl font-bold text-center text-[#A91D3A]">
            Book a Table
          </h2>
          <div className="mt-8 max-w-4xl mx-auto">
            <form onSubmit={handleBooking}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={inputBookFormValue.name}
                  onChange={handleBookingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={inputBookFormValue.email}
                  onChange={handleBookingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <input
                  type="text"
                  name="contactNo"
                  placeholder="Contact NUmber*"
                  value={inputBookFormValue.contactNo}
                  onChange={handleBookingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />
                <input
                  type="date"
                  name="date"
                  placeholder="Select Date"
                  value={inputBookFormValue.date}
                  onChange={handleBookingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <input
                  type="time"
                  name="time"
                  placeholder="Select Time"
                  value={inputBookFormValue.time}
                  onChange={handleBookingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />

                <input
                  type="text"
                  name="event"
                  placeholder="Special Event"
                  value={inputBookFormValue.event}
                  onChange={handleBookingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="btn bg-rose-red text-white hover:bg-carmine w-full sm:w-auto py-3 px-6 font-semibold"
                >
                  Book
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information Section */}
          <h2 className="text-3xl font-bold text-center text-[#A91D3A]">
            Contact Information
          </h2>
          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="flex flex-col items-center text-center">
              <FaMapMarkerAlt className="text-4xl text-[#A91D3A]" />
              <h3 className="mt-4 text-xl font-semibold">Our Address</h3>
              <p className="text-lg text-gray-700 mt-2">
                123, Main Street, Kandy, Sri Lanka
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <FaEnvelope className="text-4xl text-[#A91D3A]" />
              <h3 className="mt-4 text-xl font-semibold">Email Us</h3>
              <p className="text-lg text-gray-700 mt-2">info@weezcafe.com</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <FaPhoneAlt className="text-4xl text-[#A91D3A]" />
              <h3 className="mt-4 text-xl font-semibold">Call Us</h3>
              <p className="text-lg text-gray-700 mt-2">+94 123 456 789</p>
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="relative">
          <div className="w-full h-96">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.631634101585!2d80.61977657410317!3d7.282686213877585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae369224c87d109%3A0x1f9ee574a1cc3a!2sCafe%20Weez!5e0!3m2!1sen!2slk!4v1729875452350!5m2!1sen!2slk"
              className="w-full h-full border-none"
            ></iframe>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-6 md:px-16 bg-white">
          <h2 className="text-3xl font-bold text-center text-[#A91D3A]">
            Get in Touch
          </h2>
          <div className="mt-8 max-w-4xl mx-auto">
            <form onSubmit={handleMessaging}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={inputMessageForm.name}
                  onChange={handleMessagingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={inputMessageForm.email}
                  onChange={handleMessagingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full sm:w-1/2 p-3"
                  required
                />
              </div>

              <div className="flex flex-col mt-6">
                <textarea
                  name="message"
                  placeholder="Your Message*"
                  value={inputMessageForm.message}
                  onChange={handleMessagingOnChange}
                  className="border-b border-[#A91D3A] bg-white focus:outline-none w-full p-3 h-40"
                  required
                ></textarea>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="btn bg-[#A91D3A] text-white hover:bg-[#B92D50] w-full sm:w-auto py-3 px-6 font-semibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
