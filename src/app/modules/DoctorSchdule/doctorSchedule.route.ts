import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateReuest";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";

const router = express.Router();

router.get(
  "/",
  authGuard(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  DoctorScheduleController.getAllFromDB
);
router.post(
  "/create",
  authGuard(UserRole.DOCTOR),
  validateRequest(DoctorScheduleValidation.create),
  DoctorScheduleController.createSchedule
);
router.get(
  "/my-schedule",
  authGuard(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);
router.delete(
  "/:id",
  authGuard(UserRole.DOCTOR),
  DoctorScheduleController.deleteFromDB
);

export const DoctorScheduleRoutes = router;
