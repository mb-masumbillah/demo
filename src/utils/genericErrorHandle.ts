import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import config from "../config";
import { TError } from "./error.interface";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorResponse: TError;

  if (error instanceof mongoose.Error.ValidationError) {
    const validationErrors: Record<string, any> = {};
    Object.keys(error.errors).forEach((field) => {
      const err = error.errors[field] as mongoose.Error.ValidatorError;
      validationErrors[field] = {
        message: err.message,
        name: err.name,
        properties: {
          message:
            (err as any).properties?.message || err.message || "Invalid value",
          type: (err as any).properties?.type || "unknown",
          min: (err as any).properties?.min ?? (field === "price" ? 0 : null),
        },
        kind: err.kind,
        path: err.path,
        value: err.value,
      };
    });

    errorResponse = {
      message: "Validation failed",
      status: false,
      error: {
        name: "ValidationError",
        errors: validationErrors,
      },
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    };
  } else {
    errorResponse = {
      message: error.message || "An error occurred",
      status: false,
      error: {
        name: error.name || "Error",
        errors: {},
      },
      stack: config.node_env === "production" ? undefined : error.stack,
    };
  }

  res.status(error.status || 404).json(errorResponse);
  next();
};

export default errorHandler;
