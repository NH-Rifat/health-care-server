import express from "express";
import { ScheduleController } from "./schedule.controller";
import { UserRole } from "@prisma/client";
import authGuard from "../../middlewares/authGuard";

const router = express.Router();

router.get("/", authGuard(UserRole.DOCTOR), ScheduleController.getAllFromDB);

export const ScheduleRoutes = router;
