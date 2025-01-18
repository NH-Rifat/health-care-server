import express from "express";

const router = express.Router();

import { authController } from "./auth.controller";

router.post("/login", authController.loginUser);

export const authRoutes = router;
