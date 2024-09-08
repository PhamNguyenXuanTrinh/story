const Chapter = require("../models/chapter");
const Story = require("../models/story");
const slugify = require("slugify");
const ctrlChapter = {
  addChapter: async (req, res) => {
    try {
      const { storyId, title, content } = req.body;
      if (!storyId || !title || !content) {
        return res.status(400).json({
          success: false,
          message: "Missing input",
        });
      }

      // Find the story by ID
      const story = await Story.findById(storyId);
      if (!story) {
        return res.status(404).json({
          success: false,
          message: "Story not found",
        });
      }

      // Find the latest chapter for the story to get the last chapter number
      const lastChapter = await Chapter.findOne({ story: storyId }).sort({
        chapterNumber: -1,
      });

      // Determine the new chapter number
      const newChapterNumber = lastChapter ? lastChapter.chapterNumber + 1 : 1;

      // Create the new chapter
      const newChapter = await Chapter.create({
        story: storyId,
        title,
        content,
        chapterNumber: newChapterNumber,
        slug: slugify(req.body.title),
      });

      // Update the story's chapter list
      await story.updateOne({ $push: { chapter: newChapter._id } });

      return res.status(200).json({
        success: true,
        message: "Chapter created successfully",
        data: newChapter,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getChapter: async (req, res) => {
    try {
      const { _id } = req.params;

      const chapter = await Chapter.findById(_id).populate("story", "title");

      if (!chapter) {
        return res.status(404).json({
          success: false,
          message: "Chapter not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Chapter retrieved successfully",
        data: chapter,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getAllChapters: async (req, res) => {
    const { _id } = req.params;

    try {
      // Log the _id to ensure it's correct

      // Log the chapters result for debugging
      console.log("Chapters found:", chapters);

      // If no chapters found, return a 404 response
      if (!chapters || chapters.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No chapters found for this story",
        });
      }

      // If chapters are found, return them
      return res.status(200).json({
        success: true,
        message: "Chapters retrieved successfully",
        data: chapters,
      });
    } catch (error) {
      console.error("Error retrieving chapters:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve chapters. Server error.",
      });
    }
  },

  updateChapter: async (req, res) => {
    try {
      const { _id } = req.params;
      req.body.slug = slugify(req.body.title);
      const updatedChapter = await Chapter.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (!updatedChapter) {
        return res.status(404).json({
          success: false,
          message: "Chapter not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Chapter updated successfully",
        data: updatedChapter,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  deleteChapter: async (req, res) => {
    try {
      const { _id } = req.params;
      const deletedChapter = await Chapter.findByIdAndDelete(_id);

      if (!deletedChapter) {
        return res.status(404).json({
          success: false,
          message: "Chapter not found",
        });
      }

      // Remove the chapter reference from the story
      await Story.findByIdAndUpdate(deletedChapter.story, {
        $pull: { chapter: _id },
      });

      return res.status(200).json({
        success: true,
        message: "Chapter deleted successfully",
        data: deletedChapter,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

module.exports = ctrlChapter;
