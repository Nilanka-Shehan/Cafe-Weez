import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#C73659]">
      <div>
        <NavBar />
      </div>
      <div className="bg-[#EEEEEE]">
        <Outlet />
      </div>
      <footer className="w-full bg-[#151515] text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
