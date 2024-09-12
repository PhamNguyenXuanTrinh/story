import React, { useEffect, useState } from "react";
import { apiGetChapters } from "../apis";
import { useNavigate } from "react-router-dom";
const ListChapters = ({ storyId }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [chaptersPerPage] = useState(20); // Customize the number of chapters per page
  const [searchTerm, setSearchTerm] = useState("");
  const handleItemClick = (slugStory, slugChapter) => {
    navigate(`/chapter/${slugStory}/${slugChapter}`); // Navigate to the detail page with the story ID
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await apiGetChapters(storyId);
        console.log("Fetched chapters:", response.data);

        if (Array.isArray(response.data.data)) {
          setChapters(response.data.data);
        } else {
          console.error("Chapters data is not an array:", response.data.data);
          setChapters([]);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [storyId]);

  if (loading) return <p>Loading chapters...</p>;
  if (!chapters.length) return <p>No chapters found.</p>;

  // Filter chapters based on search term
  const filteredChapters = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = filteredChapters.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

  const totalPages = Math.ceil(filteredChapters.length / chaptersPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="font-bold text-2xl mb-4">Danh Sách Chương</h2>

      {/* Search input */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Nhập số chương..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Tìm
        </button>
      </div>

      {/* Chapter list in two-column grid */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 border rounded">
        {currentChapters.map((chapter) => (
          <div
            onClick={() => handleItemClick(chapter.story.slug,chapter.slug)} // Handle click event
            key={chapter._id}
            className="flex justify-between p-2 border-b border-gray-300 hover:bg-gray-100"
          >
            <span className="font-semibold">
              Chương {chapter.chapterNumber}:
            </span>
            <span>{chapter.title}</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &laquo; Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } rounded`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default ListChapters;
