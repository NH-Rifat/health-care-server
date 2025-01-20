import { UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";

const createAdminIntoDB = async (req: any) => {
  const file: IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    if (uploadToCloudinary) {
      req.body.admin.profilePhoto = uploadToCloudinary.secure_url;
    }
  }

  const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
  const userData = {
    email: req?.body?.admin?.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req?.body?.admin,
    });
    return createdAdminData;
  });
  return result;
};
const createDoctorIntoDB = async (req: any) => {
  const file: IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    if (uploadToCloudinary) {
      req.body.doctor.profilePhoto = uploadToCloudinary.secure_url;
    }
  }

  const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
  const userData = {
    email: req?.body?.doctor?.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdDoctorData = await transactionClient.doctor.create({
      data: req?.body?.doctor,
    });
    return createdDoctorData;
  });
  return result;
};

export const userService = {
  createAdminIntoDB,
  createDoctorIntoDB,
};
