import express, { Request, Response } from "express";
import { userController } from "./user.controller";
import { verifyToken } from "../../../helpers/jwtHelpers";
import { config } from "../../../config";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.createAdmin
);

export const userRoutes = router;
