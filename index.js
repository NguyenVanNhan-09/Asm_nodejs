import express from "express";
import mongoose from "mongoose";
import routers from "./routers/index.js";
import dotenv from "dotenv";
import ErrorHand from "./utils/errorHandler.js";
dotenv.config({ path: "./.env.local" });
const { PORT, DB_URL } = process.env;
const errorHand = new ErrorHand();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(DB_URL).then(() => {
   console.log("Connected susseccful mongodb !");
});
routers(app);

//Error handling 404
app.use(errorHand.errorHandler);
app.use(errorHand.errorHandlerNotFound);
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
