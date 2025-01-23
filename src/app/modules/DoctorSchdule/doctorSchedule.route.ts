import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create",
  authGuard(UserRole.DOCTOR),
  DoctorScheduleController.createSchedule
);

export const DoctorScheduleRoutes = router;
