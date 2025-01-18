import express from "express";

const router = express.Router();

import { authController } from "./auth.controller";

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);

export const authRoutes = router;
