import e from "express";
import ToDoModel from "../models/ToDoModel.js";
import asyncHandler from "express-async-handler";
import { matchedData } from "express-validator";
export const getToDos = asyncHandler(async (req, res) => {
  const todos = await ToDoModel.find({});
  const docs = todos.map((todo) => todo._doc);
  res.status(200).json({ todos: docs });
});
export const createToDo = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  const newToDo = new ToDoModel(data);
  const savedToDo = await newToDo.save();
  if (!savedToDo) {
    const error = new Error("Document not saved");
    error.statusCode = 500;
    return next(error);
  }
  res
    .status(201)
    .json({ message: "New ToDo created", todo: savedToDo._doc, success: true });
});
export const deleteToDo = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deletedToDo = await ToDoModel.findByIdAndDelete(id);
  if (!deletedToDo) {
    const error = new Error("Document not found/deleted successfully");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({
    message: "Successfully deleted Document",
    todo: deletedToDo._doc,
    success: true,
  });
});
export const updateToDo = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = matchedData(req);
  const updatedToDo = await ToDoModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedToDo) {
    const error = new Error("Document not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({
    message: "Successfully updated Document",
    todo: updateToDo._doc,
    success: true,
  });
});
