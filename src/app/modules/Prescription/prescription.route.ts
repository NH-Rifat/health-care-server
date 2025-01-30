import express from "express";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateReuest";
import { PrescriptionController } from "./prescription.controller";
import { PrescriptionValidationSchema } from "./prescription.validation";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.DOCTOR),
  validateRequest(PrescriptionValidationSchema.create),
  PrescriptionController.createPrescription
);

router.get(
  "/my-prescription",
  authGuard(UserRole.PATIENT),
  PrescriptionController.patientPrescription
);

router.get(
  "/",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PrescriptionController.getAllFromDB
);

export const PrescriptionRoutes = router;
