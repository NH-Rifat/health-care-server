import express, { Request, Response } from "express";
import { adminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateReuest";
import { adminValidationsSchema } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getAdminById);
router.patch(
  "/:id",
  validateRequest(adminValidationsSchema?.update),
  adminController.updateAdminById
);
router.delete("/:id", adminController.deleteAdminById);

export const adminRoutes = router;
