import express, { NextFunction, Request, Response } from "express";
import { specialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialtiesValidationSchema } from "./specialties.validation";

const router = express.Router();

router.get("/", specialtiesController.getAllSpecialties);
router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidationSchema.create.parse(
      JSON.parse(req.body.data)
    );
    return specialtiesController.createSpecialties(req, res, next);
  }
);

export const specialtiesRoutes = router;
