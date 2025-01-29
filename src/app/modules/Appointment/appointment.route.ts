import express from "express";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./appointment.controller";
const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.PATIENT),
  // validateRequest(AppointmentValidation.createAppointment),
  AppointmentController.createAppointment
);

router.get(
  "/my-appointment",
  authGuard(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment
);

router.patch(
  "/status/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.changeAppointmentStatus
);

export const AppointmentRoutes = router;
