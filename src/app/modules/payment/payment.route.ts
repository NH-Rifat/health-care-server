import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/init-payment/:appointmentId", PaymentController.initialPayment);
router.get("/validate-payment", PaymentController.validatePayment);

export const paymentRoutes = router;
