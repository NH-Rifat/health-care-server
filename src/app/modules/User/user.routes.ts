import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import multer from "multer";
import path from "path";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidationSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateReuest";

const router = express.Router();

router.get(
  "/",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllFromDB
);

router.post(
  "/create-admin",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchema.createAdmin.parse(
      JSON.parse(req.body.data)
    );
    return userController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchema.createDoctor.parse(
      JSON.parse(req.body.data)
    );
    return userController.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchema.createPatient.parse(
      JSON.parse(req.body.data)
    );
    return userController.createPatient(req, res, next);
  }
);

router.patch(
  "/:id/status",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidationSchema.updateStatus),
  userController.changeProfileStatus
);

router.get("/my-profile", authGuard(), userController.getMyProfile);

router.patch(
  "/update-my-profile",
  authGuard(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const userRoutes = router;
