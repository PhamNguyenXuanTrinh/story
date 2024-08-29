const Author = require("../models/author");
const slugify = require("slugify");
const ctrlAuthor = {
  addAuthor: async (req, res) => {
    try {
      const { name } = req.body;
      if (req.body.name) req.body.slug = slugify(req.body.name);
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Missing input",
        });
      }
      const newAuthor = await Author.create(req.body);
      return res.status(200).json({
        success: true,
        message: "User created successfully",
        data: newAuthor,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
  /// update author
  updateAuthor: async (req, res) => {
    try {
      const { _id } = req.params;
      if (req.body.name) req.body.slug = slugify(req.body.name);
      const updateAuthor = await Author.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: updateAuthor ? true : false,
        message: updateAuthor ? "update author success" : "update author fail",
        data: updateAuthor,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
  /// get one author
  getOneAuthor: async (req, res) => {
    try {
      const { _id } = req.params;
      const getOneAuthor = await Author.findById(_id).populate("story");

      return res.status(200).json({
        success: getOneAuthor ? true : false,
        message: getOneAuthor ? "find author success" : "find author fail",
        data: getOneAuthor,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  //delete author
  deleteAuthor: async (req, res) => {
    try {
      const { _id } = req.params;
      const deleteAuthor = await Author.findByIdAndDelete(_id);

      return res.status(200).json({
        success: deleteAuthor ? true : false,
        message: deleteAuthor ? "delete author success" : "delete author fail",
        data: deleteAuthor,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};
module.exports = ctrlAuthor;
