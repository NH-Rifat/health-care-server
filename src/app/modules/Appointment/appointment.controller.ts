import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/response";
import { IAuthUser } from "../../interfaces/common";
import { AppointmentService } from "./appointment.service";
import httpStatus from "http-status";
import { pickValidPropertyWithValue } from "../../../shared/pick";

const createAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await AppointmentService.createAppointmentIntoDB(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment booked successfully!",
      data: result,
    });
  }
);

const getMyAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pickValidPropertyWithValue(req.query, [
      "status",
      "paymentStatus",
    ]);
    const options = pickValidPropertyWithValue(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const result = await AppointmentService.getMyAppointment(
      user as IAuthUser,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Appointment retreive successfully",
      data: result,
    });
  }
);

const changeAppointmentStatus = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await AppointmentService.changeAppointmentStatusIntoDB(
      id,
      status,
      user as IAuthUser
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment status changed successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
  changeAppointmentStatus,
};
