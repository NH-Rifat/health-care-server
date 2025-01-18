import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../../helpers/jwtHelpers";

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(password, userData.password);

  const accessToken = await generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcd",
    "5m"
  );
  const refreshToken = await generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "efgh",
    "7d"
  );

  if (isCorrectPassword) {
    return {
      accessToken,
      refreshToken,
      needChangePassword: userData.needChangePassword,
    };
  } else {
    throw new Error("Invalid password");
  }
};

const refreshToken = async (refreshToken: string) => {
  let decodedData;
  try {
    decodedData = await verifyToken(refreshToken, "efgh");
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = await generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcd",
    "5m"
  );
  return {
    accessToken,
    needChangePassword: userData.needChangePassword,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
