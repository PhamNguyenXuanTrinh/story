import React from "react";
import { useSelector } from "react-redux";

export const ListItems = () => {
  const { stories } = useSelector((state) => state.app);
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {stories?.data.map((el) => (
        <div key={el._id} className="flex flex-col items-center">
          <img
            src={el.image} // Assuming the `image` property exists in your data
            alt={el.title}
            className="w-48 h-64 object-cover"
          />
          <p className="text-center text-white mt-2">{el.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
