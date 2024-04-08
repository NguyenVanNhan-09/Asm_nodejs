import express from "express";
import mongoose from "mongoose";
import routers from "./routers/index.js";
import ErrorHand from "./utils/errorHandler.js";
const errorHand = new ErrorHand();
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/db_xuong_thay_hoang").then(() => {
   console.log("Connected susseccful mongodb !");
});
routers(app);

//Error handling 404
app.use(errorHand.errorHandler);
app.use(errorHand.errorHandlerNotFound);
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
