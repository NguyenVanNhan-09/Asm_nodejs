import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import routers from "./routers/index.js";
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/dbxuongthayhoang").then(() => {
   console.log("Connected susseccful mongodb !");
});
app.use(cors());
routers(app);
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
