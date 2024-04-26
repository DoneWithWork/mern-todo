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

app.get("/", (req, res) => {
  res.send("Welcome to the To-Do API");
});
app.use("/todo", ToDoRoutes);

app.use(errorHandler);
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
