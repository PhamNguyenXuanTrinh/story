import React from "react";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="border w-full h-[70px] py-[10px] bg-main flex justify-center">
      <div className="w-main h-full flex justify-between ">
        <div className="">
          <img className="w-full h-full object-cover" src={Logo} alt="Logo" />
        </div>
        <ul className="w-[30%] border flex items-center">
          <li className="w-[25%] border  items-center justify-center hidden md:block">
            left 1
          </li>
          <li className="w-[25%] border  items-center justify-center hidden md:block">
            left 2
          </li>
          <li className="w-[25%] border  items-center justify-center hidden md:block">
            left 3
          </li>
        </ul>
        <div className="w-[70%] border flex items-center justify-center">
          right
        </div>
      </div>
    </div>
  );
};

export default Header;
