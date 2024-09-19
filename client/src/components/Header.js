import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import SupMenu from "./SupMenu";
import { apiGetAllGenre, apiSearchStories } from "../apis/app";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [genre, setGenre] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // State for managing active menu
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
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

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Debounce or throttle the search API call for better performance
    if (query.length > 2) {
      searchStories(query);
    } else {
      setSearchResults([]); // Clear results if query is too short
    }
  };

  // Search stories based on the query
  const searchStories = async (query) => {
    try {
      const response = await apiSearchStories(query);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Failed to search stories:", error);
    }
  };

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

  const listItems = ["Truyện mới cập nhật", "Truyện hot", "Truyện full"];
  const genreListItems = genreItems?.map((g) => g.name);

  return (
    <div className="border-b w-full h-[70px] py-[10px] bg-main flex justify-center">
      <div className="w-full max-w-screen-xl h-full flex justify-between items-center px-4 mx-auto">
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img
            className="w-12 h-12 md:w-16 md:h-16 object-cover"
            src={Logo}
            alt="Logo"
          />
          <span className="text-lg md:text-xl font-bold text-white ml-2">TruyenCV</span>
        </div>

        {/* Navigation Menu */}
        <ul className="flex space-x-4 md:space-x-6 items-center flex-wrap">
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
        </ul>

        {/* Search Bar */}
        <div className="relative flex items-center space-x-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="py-2 px-4 rounded-lg w-full"
          />
          <span className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500">
            <CiSearch size={24} />
          </span>
          {/* Display search results */}
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute bg-white shadow-lg mt-2 w-full rounded-lg z-10 top-full">
              {searchResults.map((story) => (
                <div
                  key={story._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/story/${story.slug}`)}
                >
                  {story.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
