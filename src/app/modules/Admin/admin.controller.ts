import { pickValidPropertyWithValue } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";
import { Request, Response } from "express";

const getAllAdmin = async (req: Request, res: Response) => {
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
    res.status(200).json({
      success: true,
      message: "Admin users fetched successfully",
      data: result?.data,
      meta: result?.meta,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.name : "Internal server error",
      data: null,
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getAdminByIdFromDB(id);
    res.status(200).json({
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

export const adminController = {
  getAllAdmin,
  getAdminById,
};
