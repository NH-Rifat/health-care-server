import express from "express";
import { ScheduleController } from "./schedule.controller";
import { UserRole } from "@prisma/client";
import authGuard from "../../middlewares/authGuard";

const router = express.Router();

router.post(
  "/create",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.createSchedule
);

router.get("/", authGuard(UserRole.DOCTOR), ScheduleController.getAllSchedules);

router.get(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getByIdFromDB
);
export const ScheduleRoutes = router;
