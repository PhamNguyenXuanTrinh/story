import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Nav } from "../../components";
const Public = () => {
  return (
    <div className="w-[100%] flex items-center flex-col">
      <Header className="" />
      <Nav />
      <div>
        <Outlet className="w-min" />
      </div>
    </div>
  );
};

export default Public;
