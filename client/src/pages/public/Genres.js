import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiGetGenre, apiGetStory } from "../../apis";

const Genres = () => {
  const { id } = useParams(); // Extract genre ID from the URL
  const [genre, setGenre] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreAndStories = async () => {
      try {
        // Fetch genre details
        const genreResponse = await apiGetGenre(id);
        setGenre(genreResponse.data.data);

        // Fetch detailed info for each story
        const storyDetailsPromises = genreResponse.data.data.story.map(
          (story) => apiGetStory(story._id)
        );
        const storiesResponse = await Promise.all(storyDetailsPromises);
        setStories(storiesResponse.map((res) => res.data.data));
      } catch (error) {
        console.error("Failed to fetch genre details or story details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAndStories();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!genre) return <p>Genre not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Genre: {genre.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{genre.name}</h2>
        <p className="text-gray-700 mb-4">{genre.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Stories:</h3>
          {stories.length === 0 ? (
            <p className="text-gray-600">No stories found for this genre.</p>
          ) : (
            <ul className="list-disc pl-5 mt-2">
              {genre.story.map((el) => (
                <li key={el._id} className="text-gray-800">
                  <h4 className="font-semibold">{el.title}</h4>

                  {/* Add more story details as needed */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Genres;
