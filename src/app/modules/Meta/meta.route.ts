import express from "express";
import { UserRole } from "@prisma/client";
import authGuard from "../../middlewares/authGuard";
import { MetaController } from "./meta.controller";

const router = express.Router();

router.get(
  "/",
  authGuard(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  MetaController.fetchDashboardMetaData
);

export const MetaRoutes = router;
