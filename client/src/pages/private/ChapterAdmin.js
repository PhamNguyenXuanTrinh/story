import React, { useState, useEffect } from "react";
import { ListChapters } from "../../components"; // Assuming ListChapters displays chapter list correctly
import { useParams } from "react-router-dom";
import { apiAddChapter, apiUpdateChapter, apiDeleteChapter, apiGetChapters } from "../../apis"; // API functions for chapters

// TextInput Component
const TextInput = ({ label, name, value, onChange, required = false }) => (
  <div>
    <label className="block font-bold">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded w-full py-2 px-3"
      required={required}
    />
  </div>
);

// TextArea Component
const TextArea = ({ label, name, value, onChange, required = false }) => (
  <div>
    <label className="block font-bold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded w-full py-2 px-3"
      required={required}
    />
  </div>
);

const ChapterAdmin = () => {
  const { _id: storyId } = useParams(); // Extract story ID from the URL
  const [chapters, setChapters] = useState([]); // Local state for chapters
  const [form, setForm] = useState({ title: "", content: "" });
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: null, success: null });

  // Fetch chapters when component mounts or storyId changes
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const response = await apiGetChapters(storyId);
        setChapters(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    if (storyId) fetchChapters();
  }, [storyId]);

  // Fetch chapter data if selected for editing
  useEffect(() => {
    if (selectedChapterId) {
      const chapter = chapters.find((ch) => ch._id === selectedChapterId);
      if (chapter) {
        setForm({ title: chapter.title || "", content: chapter.content || "" });
      }
    }
  }, [selectedChapterId, chapters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ error: null, success: null });

    try {
      if (!storyId) {
        setMessage({ error: "Missing story ID.", success: null });
        return;
      }

      if (selectedChapterId) {
        // Update chapter
        await apiUpdateChapter(selectedChapterId, form);
        setMessage({ success: "Chapter updated successfully!", error: null });
        setChapters((prev) =>
          prev.map((ch) =>
            ch._id === selectedChapterId ? { ...ch, ...form } : ch
          )
        );
      } else {
        // Add new chapter
        const chapterData = { ...form, storyId }; // Add storyId to the form data
        console.log("Adding chapter with data:", chapterData); // Debug: Check the data being sent
        const response = await apiAddChapter(chapterData);
        setMessage({ success: "Chapter added successfully!", error: null });
        setChapters((prev) => [...prev, response.data]);
      }
      setForm({ title: "", content: "" });
      setSelectedChapterId(null);
    } catch (error) {
      setMessage({
        error: "Failed to add/update chapter. Please try again.",
        success: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        await apiDeleteChapter(chapterId);
        setMessage({ success: "Chapter deleted successfully!", error: null });
        setChapters((prev) => prev.filter((ch) => ch._id !== chapterId));
      } catch (error) {
        setMessage({
          error: "Failed to delete chapter. Please try again.",
          success: null,
        });
      }
    }
  };

  const handleEdit = (chapter) => {
    setSelectedChapterId(chapter._id);
  };

  return (
    <div className="w-main">
      <h1 className="text-2xl font-bold mb-4">Manage Chapters</h1>

      {/* List of Chapters */}
      <ListChapters
        storyId={storyId}
        chapters={chapters}
        onEditChapter={handleEdit}
        onDeleteChapter={handleDelete}
      />

      {/* Form for Adding/Editing Chapters */}
      <div className="py-20 bg-white border rounded w-main">
        <h2 className="text-2xl font-bold mb-4">
          {selectedChapterId ? "Edit Chapter" : "Add New Chapter"}
        </h2>

        {message.error && <p className="text-red-500">{message.error}</p>}
        {message.success && <p className="text-green-500">{message.success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : selectedChapterId
              ? "Update Chapter"
              : "Add Chapter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChapterAdmin;
