import express from "express";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateReuest";
import { PrescriptionController } from "./prescription.controller";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.DOCTOR),
  // validateRequest(PrescriptionValidation.create),
  PrescriptionController.createPrescription
);

export const PrescriptionRoutes = router;
