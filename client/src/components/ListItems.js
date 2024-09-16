import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import configImage from "../ultils/configImage";

export const ListItems = () => {
  const { stories } = useSelector((state) => state.app);
  const navigate = useNavigate();

  // Function to handle item click
  const handleItemClick = (slug) => {
    navigate(`/story/${slug}`);
  };

  return (
    <div className="grid grid-cols-5 gap-5 p-4">
      {stories?.data.map((el) => (
        <div
          key={el._id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleItemClick(el.slug)}
        >
          <img
            src={configImage(el.image)}
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
