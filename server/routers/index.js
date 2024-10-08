const authorRouters = require("./author");
const storyRouters = require("./story")
const genreRouters = require("./genre")
const chapterRouters = require("./chapter")
const initRouters = (app) => {
  app.use("/api/author", authorRouters);
  app.use("/api/story", storyRouters);
  app.use("/api/genre", genreRouters);
  app.use("/api/chapter", chapterRouters)
};
module.exports = initRouters;
