const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MongoDB)
    .then(() => {
      console.log("success connect MongoDB");
    })
    .catch((error) => {
      console.error("failure connect MongoDB:", error);
    });
};
console.log("fail connect db");
module.exports = connectDb;
