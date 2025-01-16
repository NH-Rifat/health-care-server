import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const result = await userService.createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
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

export const userController = {
  createAdmin,
};
