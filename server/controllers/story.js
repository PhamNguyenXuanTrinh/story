const Story = require("../models/story");
const Author = require("../models/author");
const Genre = require("../models/genre");
const slugify = require("slugify");

const generateSlug = (text) => {
  return slugify(text, { lower: true, strict: true }).replace(/j/g, '');
};

const ctrlStory = {
  addStory: async (req, res) => {
    try {
      const {
        title,
        authorName,
        genreNames,
        image,
        description,
        content,
        status,
        rating,
        chapter,
      } = req.body;

      if (!title || !authorName || !genreNames || !Array.isArray(genreNames)) {
        return res.status(400).json({
          success: false,
          message: "Missing or invalid input",
        });
      }

      let author = await Author.findOne({ name: authorName });
      if (!author) {
        author = await Author.create({
          name: authorName,
          slug: generateSlug(authorName),
          story: [],
        });
      }

      let genreIds = [];
      for (let genreName of genreNames) {
        let genre = await Genre.findOne({ name: genreName });
        if (!genre) {
          genre = await Genre.create({
            name: genreName,
            slug: generateSlug(genreName),
            story: [],
          });
        }
        genreIds.push(genre._id);
      }

      const newStory = await Story.create({
        title,
        author: author._id,
        genres: genreIds,
        image,
        description: description || "",
        content: content || "",
        status: status || false,
        rating: rating || 5,
        chapter: chapter || [],
        slug: generateSlug(title),
      });

      await author.updateOne({ $push: { story: newStory._id } });

      for (let genreId of genreIds) {
        await Genre.findByIdAndUpdate(genreId, {
          $push: { story: newStory._id },
        });
      }

      return res.status(200).json({
        success: true,
        message: "Story created successfully",
        data: newStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    }
  },

  getStory: async (req, res) => {
    try {
      const { slug } = req.params;

      const getStory = await Story.findOne({ slug })
        .populate({ path: "author", select: "name" })
        .populate({ path: "genres", select: "name slug" });

      if (!getStory) {
        return res.status(404).json({
          success: false,
          message: "Story not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Story retrieved successfully",
        data: getStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    }
  },

  getAllStory: async (req, res) => {
    try {
      const queries = { ...req.query };
      const excludeFields = ["limit", "sort", "page", "fields"];
      excludeFields.forEach((el) => delete queries[el]);

      let queryString = JSON.stringify(queries);
      queryString = queryString.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (el) => "$" + el
      );

      const formatQuery = JSON.parse(queryString);

      if (queries?.title) {
        formatQuery.title = { $regex: queries.title, $options: "i" };
      }

      let queryCommand = Story.find(formatQuery);

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
      }

      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
      }

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skip = (page - 1) * limit;
      queryCommand = queryCommand.skip(skip).limit(limit);

      const response = await queryCommand
        .populate({ path: "author", select: "name" })
        .populate({ path: "genres", select: "name slug" });

      const counts = await Story.countDocuments(formatQuery);

      return res.status(200).json({
        success: true,
        message: response.length ? "Stories retrieved successfully" : "No stories found",
        counts,
        data: response,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    }
  },

  deleteStory: async (req, res) => {
    try {
      const { _id } = req.params;

      const deleteStory = await Story.findByIdAndDelete(_id);

      if (deleteStory) {
        await Chapter.deleteMany({ story: _id });

        const authorStoriesCount = await Story.countDocuments({ author: deleteStory.author });
        if (authorStoriesCount === 0) {
          await Author.findByIdAndDelete(deleteStory.author);
        }

        await Genre.updateMany(
          { _id: { $in: deleteStory.genres } },
          { $pull: { story: _id } }
        );
      }

      return res.status(200).json({
        success: deleteStory ? true : false,
        message: deleteStory
          ? "Story and related data deleted successfully"
          : "Failed to delete story",
        data: deleteStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
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
        rating,
        chapter,
      } = req.body;

      let author;
      if (authorName) {
        author = await Author.findOne({ name: authorName });
        if (!author) {
          author = await Author.create({
            name: authorName,
            slug: generateSlug(authorName),
            story: [],
          });
        }
      }

      let genreIds = [];
      if (genreNames) {
        for (let genreName of genreNames) {
          let genre = await Genre.findOne({ name: genreName });
          if (!genre) {
            genre = await Genre.create({
              name: genreName,
              slug: generateSlug(genreName),
              story: [],
            });
          }
          genreIds.push(genre._id);
        }
      }

      const slug = title ? generateSlug(title) : undefined;

      const updateData = {
        title,
        slug,
        author: author ? author._id : undefined,
        genres: genreIds.length > 0 ? genreIds : undefined,
        description,
        content,
        image,
        status,
        rating,
        chapter,
      };

      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      const updateStory = await Story.findByIdAndUpdate(_id, updateData, { new: true });

      return res.status(200).json({
        success: updateStory ? true : false,
        message: updateStory
          ? "Story updated successfully"
          : "Failed to update story",
        data: updateStory,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    }
  },

  searchStory: async (req, res) => {
    try {
      const { title, authorName, genreNames } = req.query;
      let query = {};

      if (title) {
        query.title = { $regex: title, $options: "i" };
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
          query.genres = { $in: genreIds.map((genre) => genre._id) };
        } else {
          return res.status(404).json({
            success: false,
            message: "Genres not found",
          });
        }
      }

      const searchResults = await Story.find(query)
        .populate("author", "name")
        .populate("genres", "name slug");

      return res.status(200).json({
        success: true,
        message: "Search results retrieved successfully",
        data: searchResults,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    }
  },
};

module.exports = ctrlStory;
