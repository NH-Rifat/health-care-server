import express from "express";
import { UserRole } from "@prisma/client";
import authGuard from "../../middlewares/authGuard";
import { validateRequest } from "../../middlewares/validateReuest";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.PATIENT),
  validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDB
);

export const ReviewRoutes = router;
