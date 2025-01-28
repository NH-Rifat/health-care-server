import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/init-router/:appointmentID", PaymentController.initialPayment);

export const paymentRoutes = router;
