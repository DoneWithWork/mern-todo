import express from "express";
import { ToDoSchema, validateSchema } from "../validations/validation.js";
import {
  getToDos,
  createToDo,
  deleteToDo,
  updateToDo,
} from "../controllers/controller.js";
const router = express.Router();

router.get("/alltodos", getToDos);
router.post("/new", ToDoSchema, validateSchema, createToDo);
router.post("/delete/:id", ToDoSchema, validateSchema, deleteToDo);
router.post("/update/:id", ToDoSchema, validateSchema, updateToDo);

export default router;
