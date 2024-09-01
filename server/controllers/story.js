const Story = require("../models/story");
const Author = require("../models/author");
const Genre = require("../models/genre");
const slugify = require("slugify");
const ctrlStory = {
  addStory: async (req, res) => {
    try {
      const { title, authorName, genreNames, image } = req.body;
      if (!title || !authorName || !genreNames || !Array.isArray(genreNames)) {
        return res.status(400).json({
          success: false,
          message: "Missing or invalid input",
        });
      }

      // Tìm hoặc tạo mới tác giả
      let author = await Author.findOne({
        name: authorName,
      });
      if (!author) {
        author = await Author.create({ name: authorName, story: [] });
      }

      // Tìm hoặc tạo mới các thể loại
      let genreIds = [];
      for (let genreName of genreNames) {
        let genre = await Genre.findOne({ name: genreName });
        if (!genre) {
          genre = await Genre.create({ name: genreName, story: [] });
        }
        genreIds.push(genre._id);
      }

      // Tạo mới quyển sách với thông tin đầy đủ
      const newStory = await Story.create({
        title,
        author: author._id,
        genres: genreIds,
        image,
        slug: slugify(req.body.title),
      });

      // Cập nhật danh sách sách của tác giả
      await author.updateOne({ $push: { story: newStory._id } });

      // Cập nhật danh sách sách cho mỗi thể loại
      for (let genreId of genreIds) {
        await Genre.findByIdAndUpdate(genreId, {
          $push: { story: newStory._id },
        });
      }

      return res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: newStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getStory: async (req, res) => {
    try {
      const { _id } = req.params;

      // Populate author và genres
      const getStory = await Story.findById(_id)
        .populate("author", "name")
        .populate("genres", "name");

      if (!getStory) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: getStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getAllStory: async (req, res) => {
    try {
      const queries = { ...req.query };
      const excludeFields = ["limit", "sort", "page", "fields"];
      excludeFields.forEach((el) => delete queries[el]);

      // Format the query operators to match MongoDB syntax
      let queryString = JSON.stringify(queries);
      queryString = queryString.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (el) => "$" + el
      );

      const formatQuery = JSON.parse(queryString);

      // Handle title search with regex
      if (queries?.title) {
        formatQuery.title = { $regex: queries.title, $options: "i" };
      }

      // Create filtering query
      let queryCommand = Story.find(formatQuery); // Ensure `Story` is used instead of `Product`

      // Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
      }

      // Fields limiting
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
      }

      // Pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || process.env.LIMIT_PRODUCTS || 10;
      const skip = (page - 1) * limit;
      queryCommand = queryCommand.skip(skip).limit(limit);

      // Execute query and count documents
      const response = await queryCommand
        .populate("author", "name")
        .populate("genres", "name")
        .exec();

      const counts = await Story.countDocuments(formatQuery);

      return res.status(200).json({
        status: "OK",
        message: response.length ? "success" : "No stories found",
        counts,
        data: response,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  deleteStory: async (req, res) => {
    try {
      const { _id } = req.params;
      const deleteStory = await Story.findByIdAndDelete(_id);

      if (deleteStory) {
        // Remove story references from author and genres
        await Author.updateOne(
          { _id: deleteStory.author },
          { $pull: { story: _id } }
        );
        await Genre.updateMany(
          { _id: { $in: deleteStory.genre } },
          { $pull: { story: _id } }
        );
      }

      return res.status(200).json({
        success: deleteStory ? true : false,
        message: deleteStory
          ? "Book deleted successfully"
          : "Failed to delete book",
        data: deleteStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  updateStory: async (req, res) => {
    try {
      const { _id } = req.params;
      const {
        title,
        authorName,
        genreNames,
        description,
        content,
        image,
        status,
        vote,
        chapter,
      } = req.body;

      // Tìm hoặc tạo mới tác giả nếu có thay đổi
      let author;
      if (authorName) {
        author = await Author.findOne({ name: authorName });
        if (!author) {
          author = await Author.create({ name: authorName, story: [] });
        }
      }

      // Tìm hoặc tạo mới các thể loại nếu có thay đổi
      let genreIds = [];
      if (genreNames) {
        for (let genreName of genreNames) {
          let genre = await Genre.findOne({ name: genreName });
          if (!genre) {
            genre = await Genre.create({ name: genreName, story: [] });
          }
          genreIds.push(genre._id);
        }
      }

      // Cập nhật thông tin truyện
      const updateData = {
        title,
        slug: slugify(req.body.title),
        author: author ? author._id : undefined,
        genres: genreIds.length > 0 ? genreIds : undefined,
        description,
        content,
        image,
        status,
        vote,
        chapter,
      };

      // Loại bỏ các trường undefined khỏi updateData
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      const updateStory = await Story.findByIdAndUpdate(_id, updateData, {
        new: true,
      });

      return res.status(200).json({
        success: updateStory ? true : false,
        message: updateStory
          ? "Book updated successfully"
          : "Failed to update book",
        data: updateStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // search story
  searchStory: async (req, res) => {
    try {
      const { title, authorName, genreNames } = req.query;
      let query = {};

      if (title) {
        query.title = { $regex: title, $options: "i" }; // Case-insensitive search
      }

      if (authorName) {
        const author = await Author.findOne({
          name: { $regex: authorName, $options: "i" },
        });
        if (author) {
          query.author = author._id;
        } else {
          return res.status(404).json({
            success: false,
            message: "Author not found",
          });
        }
      }

      if (genreNames) {
        const genreArray = genreNames.split(",");
        const genreIds = await Genre.find({
          name: { $in: genreArray.map((name) => new RegExp(name, "i")) },
        }).select("_id");

        if (genreIds.length > 0) {
          query.genre = { $in: genreIds.map((genre) => genre._id) };
        } else {
          return res.status(404).json({
            success: false,
            message: "Genres not found",
          });
        }
      }

      const searchResults = await Story.find(query)
        .populate("author", "name")
        .populate("genre", "name");

      return res.status(200).json({
        success: true,
        message: "Search results retrieved successfully",
        data: searchResults,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

module.exports = ctrlStory;
