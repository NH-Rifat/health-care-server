import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(password, userData.password);
  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcd",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcd",
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
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

export const authServices = {
  loginUser,
};
