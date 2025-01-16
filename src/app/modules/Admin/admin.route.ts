import express, { Request, Response } from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getAdminById);
router.patch("/:id", adminController.updateAdminById);
router.delete("/:id", adminController.deleteAdminById);

export const adminRoutes = router;
