import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Nav, Footer } from "../../components";

const Public = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />
      <Nav />
      <div className="flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
