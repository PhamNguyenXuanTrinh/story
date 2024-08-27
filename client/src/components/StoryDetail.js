// src/pages/public/StoryDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const StoryDetail = () => {
  const { id } = useParams();
  const { stories } = useSelector((state) => state.app);
  
  const story = stories?.data.find((story) => story._id === id);

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <div className="story-detail">
      <h1>{story.title}</h1>
      <img src={require(`../assets/story/${story.image}`)} alt={story.title} />
      <p>{story.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default StoryDetail;
