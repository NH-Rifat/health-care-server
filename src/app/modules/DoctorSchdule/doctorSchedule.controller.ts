import { Request, Response } from "express";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/response";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { pickValidPropertyWithValue } from "../../../shared/pick";

const createSchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const result = await DoctorScheduleService.insertIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule created successfully!",
      data: result,
    });
  }
);

const getMySchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pickValidPropertyWithValue(req.query, [
      "startDate",
      "endDate",
      "isBooked",
    ]);
    const options = pickValidPropertyWithValue(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const user = req.user;
    const result = await DoctorScheduleService.getMySchedule(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedule fetched successfully!",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  createSchedule,
  getMySchedule,
};
