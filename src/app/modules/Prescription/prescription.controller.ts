import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pickValidPropertyWithValue } from "../../../shared/pick";
import { sendResponse } from "../../../shared/response";
import { IAuthUser } from "../../interfaces/common";
import { PrescriptionService } from "./prescription.service";

const createPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.insertIntoDB(
      user as IAuthUser,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription created successfully",
      data: result,
    });
  }
);

export const PrescriptionController = {
  createPrescription,
};
