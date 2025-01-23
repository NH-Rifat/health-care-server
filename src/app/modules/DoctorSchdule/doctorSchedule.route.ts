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
router.get(
  "/my-schedule",
  authGuard(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);

export const DoctorScheduleRoutes = router;
