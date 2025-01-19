import express, { Request, Response } from "express";
import { adminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateReuest";
import { adminValidationsSchema } from "./admin.validation";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getAllAdmin
);
router.get(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getAdminById
);
router.patch(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidationsSchema?.update),
  adminController.updateAdminById
);
router.delete(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.deleteAdminById
);

export const adminRoutes = router;
