import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import configImage from "../ultils/configImage";

export const ListItems = () => {
  const { stories } = useSelector((state) => state.app);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle item click
  const handleItemClick = (slug) => {
    navigate(`/story/${slug}`); // Navigate to the detail page with the story ID
  };

  return (
    
    <div className="grid grid-cols-4 gap-4 p-4">
      {stories?.data.map((el) => (
        <div
          key={el._id}
          className="flex flex-col items-center cursor-pointer" // Add cursor pointer
          onClick={() => handleItemClick(el.slug)} // Handle click event
        >
          <img
            src={configImage(el.image)} // Dynamically import the image
            alt={el.title}
            className="w-48 h-64 object-cover"
          />
          <p className="text-center text-black mt-2 font-bold">{el.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
