import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiAddChapter, apiUpdateChapter, apiDeleteChapter } from "../../apis";

// TextInput Component
const TextInput = ({ label, name, value, onChange, required = false, type = "text" }) => (
  <div>
    <label className="block font-bold">{label}</label>
    <input
      type={type}
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
  const { chapters } = useSelector((state) => state.app);

  const [form, setForm] = useState({
    title: "",
    content: "",
    chapterNumber: "",
    storyId: "",
  });
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: null, success: null });

  // Fetch chapter data if selected
  useEffect(() => {
    if (selectedChapterId) {
      const chapter = chapters?.data?.find((c) => c._id === selectedChapterId);
      if (chapter) {
        setForm({
          title: chapter.title || "",
          content: chapter.content || "",
          chapterNumber: chapter.chapterNumber || "",
          storyId: chapter.story || "",
        });
      }
    }
  }, [selectedChapterId, chapters?.data]);

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
      if (selectedChapterId) {
        await apiUpdateChapter(selectedChapterId, form);
        setMessage({ success: "Chapter updated successfully!", error: null });
      } else {
        await apiAddChapter(form);
        setMessage({ success: "Chapter added successfully!", error: null });
      }
      setForm({
        title: "",
        content: "",
        chapterNumber: "",
        storyId: "",
      });
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

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        await apiDeleteChapter(_id);
        setMessage({ success: "Chapter deleted successfully!", error: null });
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
    <div>
      <div className="w-main">
        <h1 className="text-2xl font-bold mb-4">Chapter Admin</h1>

        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border">Title</th>
              <th className="px-4 py-2 text-left border">Chapter Number</th>
              <th className="px-4 py-2 text-left border">Story ID</th>
              <th className="px-4 py-2 text-left border">Edit</th>
              <th className="px-4 py-2 text-left border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {chapters?.data?.length ? (
              chapters.data.map((ch) => (
                <tr key={ch._id} className="border-b">
                  <td className="px-4 py-2 border">{ch.title}</td>
                  <td className="px-4 py-2 border">{ch.chapterNumber}</td>
                  <td className="px-4 py-2 border">{ch.story}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(ch)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(ch._id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No chapters available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="py-20 bg-white border rounded w-main">
        <h2 className="text-2xl font-bold mb-4">Add/Edit Chapter</h2>

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
          <TextInput
            label="Chapter Number"
            name="chapterNumber"
            value={form.chapterNumber}
            onChange={handleChange}
            type="number"
            required
          />
          <TextInput
            label="Story ID"
            name="storyId"
            value={form.storyId}
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
