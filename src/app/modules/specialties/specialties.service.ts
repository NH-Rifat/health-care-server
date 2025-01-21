import { Request } from "express";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { Specialties } from "@prisma/client";

const createSpecialtiesIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllSpecialtiesFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};

export const specialtiesService = {
  createSpecialtiesIntoDB,
  getAllSpecialtiesFromDB,
};
