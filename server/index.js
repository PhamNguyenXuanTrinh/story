const { config } = require("dotenv");
const express = require("express");
require("dotenv")/config()
const cors = require("cors");
const connectDb = require("./configs/connectDb")
const initRouters = require("./routers")
app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect db
connectDb()

initRouters(app)
app.get("/", (req, res) => {
  res.send("running");
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log("sever running on the port: " + port);
});
