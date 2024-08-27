import React from "react";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="border-b w-full h-[70px] py-[10px] bg-main flex justify-center">
      <div className="w-main h-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img className="w-[50px] h-[50px] object-cover" src={Logo} alt="Logo" />
          <span className="text-xl font-bold text-white ml-2">TruyenCV</span>
        </div>

        {/* Navigation Menu */}
        <ul className="flex space-x-6 items-center">
          <li className="text-white text-lg cursor-pointer">Danh sách</li>
          <li className="text-white text-lg cursor-pointer">Thể Loại</li>
          <li className="text-white text-lg cursor-pointer">Tùy Chỉnh</li>
        </ul>

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <button className="bg-gray-200 py-2 px-4 rounded-lg">Truyện Tranh</button>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm truyện..."
              className="py-2 px-4 rounded-lg w-[300px]"
            />
            <span className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500 cursor-pointer">
              🔍
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
