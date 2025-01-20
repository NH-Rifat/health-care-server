import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import { config } from "../../../config";
import { emailSender } from "./emailSender";

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
    decodedData = verifyToken(
      refreshToken,
      config.jwt.refresh_token_secret as string
    );
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
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string
  );
  return {
    accessToken,
    needChangePassword: userData.needChangePassword,
  };
};

const changePassword = async (
  user: any,
  payload: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }
) => {
  const { oldPassword, newPassword } = payload;
  const { email } = user;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    oldPassword,
    userData.password
  );

  if (isCorrectPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: {
        email: userData.email,
      },
      data: {
        password: hashedPassword,
        needChangePassword: false,
      },
    });
    return {
      message: "Password changed successfully",
    };
  } else {
    throw new Error("Invalid password");
  }
};

const forgotPassword = async (payload: { email: string }) => {
  const { email } = payload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_token_secret as string,
    config.jwt.reset_token_expires_in as string
  );
  // localhost:3000/reset-password?email=olil@gmail.com&token=resetPassToken
  const resetPasswordUrl = `${config.reset_password_url}?email=${email}&id=${userData?.id}&token=${resetPassToken}`;
  // console.log(resetPasswordUrl);
  const sendEmail = await emailSender(
    userData.email,
    `
    <div>
      <h1>Reset Password</h1>
      <p>Dear User, you requested to reset your password</p>
      <p>Click the link below to reset your password</p>
      <a href="${resetPasswordUrl}">
      <button>Reset Password</button>
      </a>
    </div>
    `
  );

  // Send email with reset token
  return {
    message: "Password reset link sent successfully",
  };
};

const resetPassword = async (
  token: string,
  payload: {
    id: string;
    password: string;
  }
) => {
  const { id, password } = payload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
  });

  const decodedData = verifyToken(
    token,
    config.jwt.reset_token_secret as string
  );

  if (decodedData.email === userData.email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        email: userData.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return {
      message: "Password reset successfully",
    };
  } else {
    throw new Error("Invalid token");
  }
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
