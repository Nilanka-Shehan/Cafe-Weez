import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutgoingMail, MdOutlinePhoneForwarded } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer-background bg-black text-white py-8 h-[80vh] sm:h-auto">
      <div className="container mx-auto h-auto flex flex-col md:flex-row sm:items-end md:items-center space-y-10 md:space-x-[10rem] items-center">
        {/* Google Map Embed */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.631634101585!2d80.61977657410317!3d7.282686213877585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae369224c87d109%3A0x1f9ee574a1cc3a!2sCafe%20Weez!5e0!3m2!1sen!2slk!4v1729875452350!5m2!1sen!2slk"
            className="image w-full h-[30vh] md:h-[450px] border-0 p-1 md:pr-3"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />{" "}
        </div>
        {/* Footer Content */}
        <div className="h-[20vh] flex flex-col space-y-5 sm:space-y-10">
          <div className="text-gamboge text-2xl sm:text-4xl underline">
            CONTACT US
          </div>
          <div className="flex flex-row space-x-5">
            <FaMapMarkerAlt className="text-gamboge text-2xl sm:text-4xl" />
            <h4 className="text-sm">
              Address : No 589 Peradeniya Rd,
              <br /> Kandy 20000
            </h4>
          </div>
          <div className="flex flex-row space-x-5">
            <MdOutlinePhoneForwarded className="text-gamboge text-2xl sm:text-4xl" />
            <h4 className="text-sm">Phone : (+94) 77 442 2448</h4>
          </div>
          <div className="flex flex-row space-x-5">
            <MdOutgoingMail className="text-gamboge text-2xl sm:text-4xl" />
            <h4 className="text-sm">
              eMail : <br />
              cafeweez@gmail.com
            </h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
