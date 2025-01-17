import { catchAsync } from "../../../shared/catchAsync";
import { pickValidPropertyWithValue } from "../../../shared/pick";
import { sendResponse } from "../../../shared/response";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";
import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const filtersQuery = pickValidPropertyWithValue(
    req.query,
    adminFilterableFields
  );
  const options = pickValidPropertyWithValue(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ]);
  const result = await AdminService.getAllFromDB(filtersQuery, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin users fetched successfully",
    data: result?.data,
    meta: result?.meta
      ? {
          total: result?.meta?.totalRecords,
          page: result?.meta?.page,
          limit: result?.meta?.limit,
        }
      : undefined,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getAdminByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin user fetched successfully",
    data: result,
  });
});

const updateAdminById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = req.body;
    const result = await AdminService.updateAdminByIdFromDB(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin user updated successfully",
      data: result,
    });
  }
);

const deleteAdminById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AdminService.softDeleteAdminByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin user deleted successfully",
      data: result,
    });
  }
);

export const adminController = {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
