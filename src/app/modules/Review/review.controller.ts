import { Request, Response } from "express";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/response";
import { pickValidPropertyWithValue } from "../../../shared/pick";
import { reviewFilterableFields } from "./review.constant";
import { ReviewService } from "./review.service";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await ReviewService.insertIntoDB(
      user as IAuthUser,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pickValidPropertyWithValue(req.query, reviewFilterableFields);
  const options = pickValidPropertyWithValue(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ]);
  const result = await ReviewService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewController = {
  insertIntoDB,
  getAllFromDB,
};
