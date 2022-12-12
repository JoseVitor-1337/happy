import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

type IValidationErrors = {
  [key: string]: string[];
};

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: IValidationErrors = {};

    error.inner.forEach((err) => {
      if (err.path) errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: "Validations fails", errors });
  }

  return response.status(400).json({ message: "Internal server error" });
};

export default errorHandler;
