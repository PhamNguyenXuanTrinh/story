import React from "react";
import { useSelector } from "react-redux";
import getImages from "../ultils/cofigImages";
export const ListItems = () => {
  const { stories } = useSelector((state) => state.app);


  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {stories?.data.map((el) => (
        <div key={el._id} className="flex flex-col items-center">
          <img
            src={getImages(el.image)} // Dynamically import the image
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
