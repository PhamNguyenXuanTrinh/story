import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetChapter } from "../../apis"; // Import your API function to fetch chapter data

const Chapter = () => {
  const { slugStory, slugChapter } = useParams(); // Get the chapter ID from URL params
  const [chapter, setChapter] = useState(null); // State to store chapter data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  const [isFirstChapter, setIsFirstChapter] = useState(false); // Check if it's the first chapter
  const [isLastChapter, setIsLastChapter] = useState(false); // Check if it's the last chapter
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await apiGetChapter(slugStory, slugChapter); // Fetch chapter data by ID
        setChapter(response.data);

        // Determine if this is the first or last chapter
        setIsFirstChapter(response.data.chapterNumber === 1); // Assuming chapterNumber === 1 is the first chapter
        // You should have a way to determine the total number of chapters
        // For demo purposes, assuming 30 is the last chapter
        setIsLastChapter(response.data.chapterNumber === 30);
      } catch (error) {
        setError("Failed to fetch chapter.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [slugStory, slugChapter]); // Fetch data when ID changes

  // Extract prefix and number from slugChapter
  const parts = slugChapter.split("-");
  const prefix = parts[0] + "-"; // "chuong-"
  const currentChapterNumber = parseInt(parts[1], 10); // Chapter number

  // Handle navigating to the next chapter
  const goToNextChapter = () => {
    if (!isLastChapter) {
      navigate(`/chapter/${slugStory}/${prefix}${currentChapterNumber + 1}`); // Go to the next chapter
    }
  };

  // Handle navigating to the previous chapter
  const goToPreviousChapter = () => {
    if (!isFirstChapter) {
      navigate(`/chapter/${slugStory}/${prefix}${currentChapterNumber - 1}`); // Go to the previous chapter
    }
    navigate(`/chapter/${slugStory}/chuong-1`); // Go to the next chapter
  };

  if (loading) return <p>Loading chapter...</p>;
  if (error) return <p>{error}</p>;
  if (!chapter) return <p>No chapter found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Chapter Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          {chapter.data.title}
        </h1>
      </header>

      {/* Chapter Content */}
      <section className="prose prose-lg text-gray-800 leading-relaxed text-2xl">
        {chapter.data.content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </section>

      {/* Chapter Navigation */}
      <div className="pt-20 flex justify-between">
        <button
          onClick={goToPreviousChapter}
          disabled={isFirstChapter} // Disable if it's the first chapter
          className={`px-4 py-2 rounded ${
            isFirstChapter
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-main "
          } text-white transition`}
        >
          &larr; Chương Trước
        </button>

        <button
          onClick={goToNextChapter}
          disabled={isLastChapter} // Disable if it's the last chapter
          className={`px-4 py-2 rounded ${
            isLastChapter
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-main "
          } text-white transition`}
        >
          Chương Sau &rarr;
        </button>
      </div>
    </div>
  );
};

export default Chapter;
