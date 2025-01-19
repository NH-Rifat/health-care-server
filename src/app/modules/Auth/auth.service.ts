import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import { config } from "../../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(password, userData.password);

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string
  );
  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
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
    decodedData = verifyToken(refreshToken, "efgh");
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
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
