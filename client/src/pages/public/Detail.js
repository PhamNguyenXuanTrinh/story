import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import string from "../../ultils/string";
import { apiGetSingleStory } from "../../apis";
import { configImage, capitalizeWords } from "../../ultils";
import { ListChapters } from "../../components";

const Detail = () => {
  const { slug } = useParams(); // Extract story ID from the URL
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleItemClick = (slug) => {
    navigate(`/genres/${slug}`); // Navigate to the genre page
  };

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await apiGetSingleStory(slug);
        setStory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch story details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Story not found</p>;

  return (
    <div className="justify-center w-full p-4">
      <div className="mx-auto w-full max-w-screen-lg">
        <div className="p-6 bg-gray-800 text-white flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0 w-full lg:w-60 h-80">
            <img
              src={configImage(story.image)}
              alt={story.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{story.title}</h1>
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
                    story.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {story.status ? "Đã hoàn thành" : "Còn tiếp"}
                </span>
              </div>
              {/* Genres */}
              <div className="flex gap-2 mt-4 cursor-pointer flex-wrap">
                {story.genres.map((genre) => (
                  <div
                    key={genre._id}
                    onClick={() => handleItemClick(genre.slug)} // Handle click event
                    className="tag border px-2 py-1"
                  >
                    {capitalizeWords(genre.name)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-6">
          <h1 className="mt-10 font-bold border-b-4 border-main hover:text-main">
            <u>{string.info}</u>
          </h1>
          <p className="mt-4">{story.content}</p>
        </div>
      </div>
      <ListChapters storyId={story._id} />
    </div>
  );
};

export default Detail;
