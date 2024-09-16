import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import SupMenu from "./SupMenu";
import { apiGetAllGenre } from "../apis/app";

const Header = () => {
  const [genre, setGenre] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // State for managing active menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await apiGetAllGenre();
        setGenre(response.data.data);
      } catch (error) {
        console.error("Failed to fetch genre details:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleItemClick = (slug) => {
    navigate(`/genres/${slug}`);
    setActiveMenu(null); // Close the submenu after navigation
  };

  const handleMenuToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu); // Toggle the active menu
  };

  const genreItems = genre?.map((g) => ({
    name: g.name,
    slug: g.slug,
  }));

  const listItems = ["Submenu 1", "Submenu 2", "Submenu 3"];
  const genreListItems = genreItems?.map((g) => g.name);
  const settingItems = ["Submenu 1", "Submenu 2", "Submenu 3"];

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
          <SupMenu
            title="Danh sách"
            items={listItems}
            isOpen={activeMenu === "danhSach"}
            onToggle={() => handleMenuToggle("danhSach")}
          />
          <SupMenu
            title="Thể Loại"
            items={genreListItems}
            isOpen={activeMenu === "theLoai"}
            onToggle={() => handleMenuToggle("theLoai")}
            onItemClick={(itemName) => {
              const genreItem = genreItems.find((g) => g.name === itemName);
              if (genreItem) handleItemClick(genreItem.slug);
            }}
          />
          <SupMenu
            title="Tùy Chỉnh"
            items={settingItems}
            isOpen={activeMenu === "tuyChinh"}
            onToggle={() => handleMenuToggle("tuyChinh")}
          />
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
