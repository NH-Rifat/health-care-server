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

export const ReviewController = {
  insertIntoDB,
};
