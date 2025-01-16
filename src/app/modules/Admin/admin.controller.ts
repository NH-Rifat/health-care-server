import { AdminService } from "./admin.service";
import { Request, Response } from "express";

const getAllAdmin = async (req: Request, res: Response) => {
  const { query } = req;
  try {
    const result = await AdminService.getAllFromDB(query);
    res.status(200).json({
      success: true,
      message: "Admin users fetched successfully",
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
};
