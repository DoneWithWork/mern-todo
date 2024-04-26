import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    due: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ToDoModel = mongoose.model("ToDo", ToDoSchema);
export default ToDoModel;
