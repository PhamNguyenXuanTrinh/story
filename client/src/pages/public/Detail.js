// StoryDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import string from "../../ultils/string";
import { apiGetSingleStory } from "../../apis";
import configImage from "../../ultils/configImage";
const Detail = () => {
  const { id } = useParams(); // Extract story ID from the URL
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const handleItemClick = (id) => {
    navigate(`/genres/${id}`); // Navigate to the detail page with the story ID
  };

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
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  return (
    <div className="justify-center w-full">
      <div className="mx-auto w-main">
        <div className="p-6 bg-gray-800 text-white flex gap-6 w-main">
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
                <span className="font-semibold">Tác giả:</span>{" "}
                {story.author.name}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 mr-2">⭐⭐⭐⭐⭐</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span>Chương: {story.chapter.length}</span>
                <span>Đánh giá: {story.rating}</span>
                <span
                  className={`status ${
                    story.status === true
                      ? "text-green-500" // Màu xanh cho trạng thái "đã hoàn thành"
                      : "text-red-500" // Màu đỏ cho trạng thái "còn tiếp"
                  }`}
                >
                  {story.status === true ? "Đã hoàn thành" : "Còn tiếp"}
                </span>
              </div>
              {/* Genres */}

              <div className="flex gap-2 mt-4">
                {story.genres.map((genre) => (
                  <div
                    key={genre._id}
                    onClick={() => handleItemClick(genre._id)} // Handle click event
                    className="tag border"
                  >
                    {capitalizeWords(genre.name)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <h1 className="mt-20 font-bold border-b-4 hover:text-main">
            <u>{string.info}</u>
          </h1>
          <p>{story.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
