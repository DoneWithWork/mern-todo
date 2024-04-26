import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import errorHandler from "./middlewares/error.js";
import cors from "cors";
import ToDoRoutes from "./routes/routes.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/todo", ToDoRoutes);

app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
