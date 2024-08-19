const authorRouters = require("./author");

const initRouters = (app) => {
  app.use("/api/author", authorRouters);
};
module.exports = initRouters;
