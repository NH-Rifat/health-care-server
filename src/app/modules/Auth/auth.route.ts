import express from "express";

const router = express.Router();

import { authController } from "./auth.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  authGuard(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  authController.changePassword
);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
