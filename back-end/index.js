const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 3001;
require("dotenv");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => console.log("Successfuly connect to the Mongodb"))
  .catch((error) => console.log("Mongodb error"));

const menuRoutes = require('./api/routes/menuRoutes')

app.use('/menu',menuRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
