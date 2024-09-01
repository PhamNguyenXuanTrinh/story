// StoryDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGetSingleStory } from "../../apis";
import configImage from "../../ultils/configImage";
const Detail = () => {
  const { id } = useParams(); // Extract story ID from the URL
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await apiGetSingleStory(id);
        console.log(response.data.data);
        setStory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch story details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Story not found</p>;

  return (
    <div className="p-6 bg-gray-800 text-white flex gap-6">
      <div className="flex-shrink-0 w-60 h-80">
        <img
          src={configImage(story.image)}
          alt={story.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{story.title}</h1>
          <p className="mt-2">
            <span className="font-semibold">Tác giả:</span> {story.author.name}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-2">⭐⭐⭐⭐⭐</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span>Chương: {story.currentChapter}</span>
            <span>Đánh giá: {story.rating}</span>
            <span
              className={`status ${
                story.status === "Còn tiếp" ? "text-green-500" : "text-red-500"
              }`}
            >
              {story.status}
            </span>
          </div>
          {/* Genres */}
          <div className="flex gap-2 mt-4">
            {story.genres.map((genre) => (
              <span key={genre._id} className="tag">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
