import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetGenre } from "../../apis";
import configImage from "../../ultils/configImage";

const Genres = () => {
  const { slug } = useParams(); // Extract story ID from the URL

  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchGenreAndStories = async () => {
      try {
        // Fetch genre details
        const genreResponse = await apiGetGenre(slug);
        setGenre(genreResponse.data);
      } catch (error) {
        console.error("Failed to fetch genre details or stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAndStories();
  }, [slug]);

  console.log(genre);

  if (loading) return <p>Loading...</p>;
  if (!genre) return <p>Genre not found</p>;

  const handleItemClick = (slug) => {
    navigate(`/story/${slug}`); // Navigate to the detail page with the story slug
  };

  return (
    <div className="p-4 w-main">
      <h1 className="text-2xl font-bold mb-4">Genre: {genre?.data.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{genre?.data.name}</h2>
        <h2 className="text-xl font-semibold mb-2">{genre?.data.description}</h2>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Stories:</h3>
          <ul className="list-disc pl-5 mt-2">
            {genre?.data.story?.map((el) => (
              <div
                key={el._id}
                className="flex flex-col items-center cursor-pointer" // Add cursor pointer
                onClick={() => handleItemClick(el.slug)} // Handle click event
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
                  {el.author.name} {/* Assuming 'author' is just a string or an ID */}
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
