import { catchAsync } from "../../../shared/catchAsync";
import { pickValidPropertyWithValue } from "../../../shared/pick";
import { sendResponse } from "../../../shared/response";
import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { specialtiesService } from "./specialties.service";

const createSpecialties = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await specialtiesService.createSpecialtiesIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtiesService.getAllSpecialtiesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

export const specialtiesController = {
  createSpecialties,
  getAllSpecialties,
};
