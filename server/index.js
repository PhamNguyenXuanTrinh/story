const { config } = require("dotenv");
const express = require("express");
require("dotenv")/config()
const connectDb = require("./configs/connectDb")
app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect db
connectDb()
app.get("/", (req, res) => {
  res.send("running");
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log("sever running on the port: " + port);
});
