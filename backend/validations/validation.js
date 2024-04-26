import { validationResult, body } from "express-validator";

export const ToDoSchema = [
  body("title").isString().notEmpty().escape(),
  body("description").isString().notEmpty().escape(),
  body("done").isBoolean().notEmpty(),
  body("due").isDate().notEmpty(),
];

export function validateSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    const error = new Error();
    error.statusCode = 422;
    error.message = "Validation failed";
    error.stack = errorMsgs;
    return next(error);
  }
  next();
}
