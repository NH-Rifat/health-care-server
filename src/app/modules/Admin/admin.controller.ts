import { pickValidPropertyWithValue } from "../../../shared/pick";
import { sendResponse } from "../../../shared/response";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
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
  try {
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
  } catch (err) {
    next(err);
  }
};

const getAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getAdminByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin user fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.name : "Internal server error",
      data: null,
    });
  }
};

const updateAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await AdminService.updateAdminByIdFromDB(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin user updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.softDeleteAdminByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin user deleted successfully",
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err instanceof Error ? err.name : "Internal server error",
    //   data: null,
    // });
    next(err);
  }
};

export const adminController = {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
