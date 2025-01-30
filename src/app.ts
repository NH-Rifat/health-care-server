import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import { AppointmentService } from "./app/modules/Appointment/appointment.service";
import cron from "node-cron";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser
app.use(cookieParser());

cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnpaidAppointmentsFromDB();
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Resource not found",
    error: {
      statusCode: httpStatus.NOT_FOUND,
      path: req?.originalUrl,
      message: "Request path not found",
    },
  });
});

export default app;
