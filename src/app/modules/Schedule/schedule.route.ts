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

router.get(
  "/",
  authGuard(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.getAllSchedules
);

router.get(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getByIdFromDB
);

router.delete(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.deleteFromDB
);
export const ScheduleRoutes = router;
