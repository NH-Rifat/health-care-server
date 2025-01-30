import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message;
  let error = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Unique Constraint Violation";
      error = err.message;
    }
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
