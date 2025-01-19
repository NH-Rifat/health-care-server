import jwt from "jsonwebtoken";

export const generateToken = (
  payload: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  const accessToken = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
  return accessToken;
};

export const verifyToken = (token: string, secret: string) => {
  const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
  return decodedData;
};
