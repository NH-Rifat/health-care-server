import express, { Request, Response } from "express";
import { userController } from "./user.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import multer from "multer";
import path from "path";
import { fileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  userController.createAdmin
);

export const userRoutes = router;
