import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
