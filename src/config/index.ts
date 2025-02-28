import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_token_secret: process.env.RESET_TOKEN_SECRET,
    reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
  },
  reset_password_url: process.env.RESET_PASSWORD_URL,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASSWORD,
  },
  ssl: {
    storeId: process.env.STORE_ID,
    storePassword: process.env.STORE_PASSWORD,
    successURl: process.env.SUCCESS_URL,
    failURl: process.env.FAIL_URL,
    cancelURl: process.env.CANCEL_URL,
    sslPaymentAPI: process.env.SSL_PAYMENT_API_URL,
    sslValidationAPI: process.env.SSL_VALIDATION_API_URL,
  },
};
