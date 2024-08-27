import React from "react";
import { useSelector } from "react-redux";
const ListStoryComplete = () => {
  const { stories } = useSelector((state) => state.app);

  const getImage = (imagePath) => {
    try {
      // Adjust the path based on your directory structure
      return require(`../assets/story/${imagePath}`);
    } catch (err) {
      console.error("Image not found:", imagePath);
      return null; // Or return a default image
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {stories?.data.map((el) => (
        <div key={el._id} className="flex flex-col items-center">
          <img
            src={getImage(el.image)} // Dynamically import the image
            alt={el.title}
            className="w-48 h-64 object-cover"
          />
          <p className="text-center text-white mt-2">{el.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ListStoryComplete;
