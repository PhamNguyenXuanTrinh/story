const Genre = require("../models/genre");
const slugify = require("slugify");
const ctrlGenre = {
  addGenre: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: "Missing input",
        });
      }

      // Tạo thể loại mới với dữ liệu đã chỉnh sửa
      const newGenre = await Genre.create({
        ...req.body,
        slug: slugify(req.body.name),
      });
      return res.status(200).json({
        success: true,
        message: "Genre created successfully",
        data: newGenre,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Update genre
  updateGenre: async (req, res) => {
    try {
      const { _id } = req.params;
      req.body.slug = slugify(req.body.title);
      const updateGenre = await Genre.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: updateGenre ? true : false,
        message: updateGenre
          ? "Genre updated successfully"
          : "Genre update failed",
        data: updateGenre,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Get one genre
  getOneGenre: async (req, res) => {
    try {
      const { _id } = req.params;
      const getOneGenre = await Genre.findById(_id).populate("story");

      return res.status(200).json({
        success: getOneGenre ? true : false,
        message: getOneGenre
          ? "Genre retrieved successfully"
          : "Genre not found",
        data: getOneGenre,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
  getGenre: async (req, res) => {
    try {
      // Populate author và genres
      const getGenre = await Genre.find().populate("story");

      if (!getGenre) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: getGenre,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
  // Delete genre
  deleteGenre: async (req, res) => {
    try {
      const { _id } = req.params;
      const deleteGenre = await Genre.findByIdAndDelete(_id);

      return res.status(200).json({
        success: deleteGenre ? true : false,
        message: deleteGenre
          ? "Genre deleted successfully"
          : "Genre delete failed",
        data: deleteGenre,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

module.exports = ctrlGenre;
