const express = require("express");
const app = express();
const cors = require("cors");
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
//dotenv.config();


const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}











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
