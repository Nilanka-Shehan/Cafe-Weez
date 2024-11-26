require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methoods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//connect database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Successfuly connect to the Mongodb"))
  .catch((error) => console.log(`${error}`));

//coonect routes
const menuRoutes = require("./api/routes/menuRoutes");
const userRoutes = require("./api/routes/userRoutes");

app.use("/menu", menuRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
