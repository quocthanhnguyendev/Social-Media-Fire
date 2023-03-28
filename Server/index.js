import express from "express";
import bodyParser from "body-parser"; //Dùng để sử dụng phương thức post lấy data
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
// Routes

const app = express();

//Folder Public Image
app.use(express.static("public"));
app.use("/images", express.static("images"));

// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server listening at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Usage Of Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
