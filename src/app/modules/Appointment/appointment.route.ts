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

export const AppointmentRoutes = router;
