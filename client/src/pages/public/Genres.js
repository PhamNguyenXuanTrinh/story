import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetGenre } from "../../apis";
import { useSelector } from "react-redux";
import configImage from "../../ultils/configImage";
const Genres = () => {
  const { id } = useParams(); // Extract genre ID from the URL
  const { stories } = useSelector((state) => state.app);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchGenreAndStories = async () => {
      try {
        // Fetch genre details
        const genreResponse = await apiGetGenre(id);
        setGenre(genreResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch genre details or story details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAndStories();
  }, [id]);
  const filteredStories = stories?.data.filter((story) =>
    story.genres.some((genre) => genre._id === id)
  );

  if (loading) return <p>Loading...</p>;
  if (!genre) return <p>Genre not found</p>;
  const handleItemClick = (id) => {
    navigate(`/story/${id}`); // Navigate to the detail page with the story ID
  };
  return (
    <div className="p-4 w-main">
      <h1 className="text-2xl font-bold mb-4">Genre: {genre.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{genre.name}</h2>
        <p className="text-gray-700 mb-4">{genre.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Stories:</h3>
          <ul className="list-disc pl-5 mt-2">
            {filteredStories.map((el) => (
              <div
                key={el._id}
                className="flex flex-col items-center cursor-pointer" // Add cursor pointer
                onClick={() => handleItemClick(el._id)} // Handle click event
              >
                <img
                  src={configImage(el.image)} // Dynamically import the image
                  alt={el.title}
                  className="w-48 h-64 object-cover"
                />
                <p className="text-center text-black mt-2 font-bold">
                  {el.title}
                </p>
                <p className="text-center text-black mt-2 font-bold">
                  {el.author.name}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Genres;
