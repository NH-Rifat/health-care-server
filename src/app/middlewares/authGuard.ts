import httpStatus from "http-status";
import { Request, Response } from "express";
import { verifyToken } from "../../helpers/jwtHelpers";
import { config } from "../../config";
import ApiError from "../Errors/ApiError";

const authGuard = (...roles: string[]) => {
  return async (req: Request, res: Response, next: Function) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
      }
      const verifiedUser = verifyToken(token, config.jwt.jwt_secret as string);
      if (roles?.length && !roles?.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authGuard;
