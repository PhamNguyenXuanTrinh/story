import React from "react";

const SupMenu = ({ title, items, isOpen, onToggle, onItemClick }) => {
  return (
    <li className="relative">
      <span className="text-white text-lg cursor-pointer" onClick={onToggle}>
        {title}
      </span>

      {isOpen && (
        <ul className="absolute text-black space-y-2 p-4 bg-gray-200 mt-5 min-w-[200px]">
          {items?.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-300 p-2 "
                onClick={() => onItemClick(item)} // Call the onItemClick with the item name
              >
                {item}
              </li>
            ))
          ) : (
            <li className="cursor-default p-2">No items available</li>
          )}
        </ul>
      )}
    </li>
  );
};

export default SupMenu;
