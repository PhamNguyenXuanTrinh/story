import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Nav, Footer } from "../../components";
const Public = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />
      <Nav />
      <div>
        <Outlet className="w-min" />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
