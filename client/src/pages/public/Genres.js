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
    <div className="p-4 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl lg:text-4xl">
        Thể loại: {genre?.data.name}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4 text-center sm:text-2xl lg:text-3xl">
          {genre?.data.description}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 p-4">
          {genre?.data.story.map((el) => (
            <div
              key={el._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleItemClick(el.slug)}
            >
              <img
                src={configImage(el.image)}
                alt={el.title}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-md"
              />
              <p className="text-center text-black mt-2 font-bold text-sm sm:text-base lg:text-lg">
                {el.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
