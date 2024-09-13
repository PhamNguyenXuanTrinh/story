import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiAddStory, apiUpdateStory, apiDeleteStory } from "../../apis";
import { useSelector } from "react-redux";

// TextInput Component
const TextInput = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => (
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

// GenresInput Component
const GenresInput = ({ genres = [], onAddGenre, onRemoveGenre }) => (
  <div>
    <label className="block font-bold">Genres</label>
    <div className="flex flex-wrap items-center gap-2">
      {genres.length ? (
        genres.map((genre) => (
          <span
            key={genre}
            className="bg-blue-200 text-blue-800 py-1 px-2 rounded flex items-center gap-2"
          >
            {genre}
            <button
              type="button"
              onClick={() => onRemoveGenre(genre)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </span>
        ))
      ) : (
        <p>No genres added</p>
      )}
      <input
        type="text"
        placeholder="Press Enter to add a genre"
        onKeyDown={onAddGenre}
        className="border rounded w-full py-2 px-3"
      />
    </div>
  </div>
);

// AddStory Component
const ProductAdmin = () => {
  // Function to handle item click

  const navigate = useNavigate(); // Hook to navigate programmatically
  const { stories } = useSelector((state) => state.app);
  const handleItemClick = (_id) => {
    navigate(`chapter/all/${_id}`); // Navigate to the detail page with the story ID
  };
  const [form, setForm] = useState({
    title: "",
    authorName: "",
    description: "",
    content: "",
    image: "",
    genreNames: [],
    status: false,
    rating: 0,
  });
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: null, success: null });

  // Fetch story data if selected
  useEffect(() => {
    if (selectedStoryId) {
      const story = stories?.data?.find((s) => s._id === selectedStoryId);
      if (story) {
        setForm({
          title: story.title || "",
          authorName: story.authorName || "",
          description: story.description || "",
          content: story.content || "",
          image: story.image || "",
          genreNames: story.genreNames || [],
          status: story.status || false,
          rating: story.rating || 0,
        });
      }
    }
  }, [selectedStoryId, stories?.data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddGenre = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newGenre = e.target.value.trim();
      if (!form.genreNames.includes(newGenre)) {
        setForm((prev) => ({
          ...prev,
          genreNames: [...prev.genreNames, newGenre],
        }));
      }
      e.target.value = "";
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setForm((prev) => ({
      ...prev,
      genreNames: prev.genreNames.filter((genre) => genre !== genreToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ error: null, success: null });

    try {
      if (selectedStoryId) {
        await apiUpdateStory(selectedStoryId, form);
        setMessage({ success: "Story updated successfully!", error: null });
      } else {
        await apiAddStory(form);
        setMessage({ success: "Story added successfully!", error: null });
      }
      setForm({
        title: "",
        authorName: "",
        description: "",
        content: "",
        image: "",
        genreNames: [],
        status: false,
        rating: 0,
      });
      setSelectedStoryId(null);
    } catch (error) {
      setMessage({
        error: "Failed to add/update story. Please try again.",
        success: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        await apiDeleteStory(_id);
        setMessage({ success: "Story deleted successfully!", error: null });
      } catch (error) {
        setMessage({
          error: "Failed to delete story. Please try again.",
          success: null,
        });
      }
    }
  };

  const handleEdit = (story) => {
    setSelectedStoryId(story._id);
  };

  return (
    <div>
      <div className="w-main">
        <h1 className="text-2xl font-bold mb-4">Product Admin</h1>

        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border">Title</th>
              <th className="px-4 py-2 text-left border">Author</th>
              <th className="px-4 py-2 text-left border">Description</th>
              <th className="px-4 py-2 text-left border">Rating</th>
              <th className="px-4 py-2 text-left border">Edit</th>
              <th className="px-4 py-2 text-left border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {stories?.data?.length ? (
              stories.data.map((el) => (
                <tr key={el._id} className="border-b">
                  <td
                    className="px-4 py-2 border"
                    onClick={() => {
                      handleItemClick(el._id);
                    }}
                  >
                    {el.title}
                  </td>
                  <td className="px-4 py-2 border">{el.authorName}</td>
                  <td className="px-4 py-2 border">{el.description}</td>
                  <td className="px-4 py-2 border">{el.rating}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(el)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(el._id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No stories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="py-20 bg-white border rounded w-main">
        <h2 className="text-2xl font-bold mb-4">Add New Story</h2>

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
            label="Author Name"
            name="authorName"
            value={form.authorName}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Description"
            name="description"
            value={form.description}
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
          <GenresInput
            genres={form.genreNames}
            onAddGenre={handleAddGenre}
            onRemoveGenre={handleRemoveGenre}
          />
          <TextInput
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          <div>
            <label className="block font-bold">Status</label>
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Published</span>
          </div>
          <TextInput
            label="Rating (0 to 5)"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            type="number"
            min="0"
            max="5"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : selectedStoryId
              ? "Update Story"
              : "Add Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductAdmin;
