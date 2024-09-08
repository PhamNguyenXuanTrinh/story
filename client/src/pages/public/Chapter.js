import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from URL
import { apiGetChapter } from "../../apis/"; // Import your API function to fetch chapter data

const Chapter = () => {
  const { id } = useParams(); // Get the chapter ID from URL params
  const [chapter, setChapter] = useState(null); // State to store chapter data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await apiGetChapter(id); // Fetch chapter data by ID
        setChapter(response.data);
      } catch (error) {
        setError("Failed to fetch chapter.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]); // Fetch data when ID changes

  if (loading) return <p>Loading chapter...</p>;
  if (error) return <p>{error}</p>;
  if (!chapter) return <p>No chapter found.</p>;
  console.log(chapter);
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Chapter Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{chapter.data.title}</h1>
        <p className="text-lg text-gray-600 mt-1">
          Chapter {chapter.data.chapterNumber}
        </p>
      </header>

      {/* Chapter Content */}
      <section className="prose prose-lg text-gray-800">
        <p>{chapter.data.content}</p>
      </section>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          &larr; Go Back
        </button>
      </div>
    </div>
  );
};

export default Chapter;
