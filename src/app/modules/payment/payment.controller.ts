import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/response";
import { PaymentService } from "./payment.service";
import ApiError from "../../Errors/ApiError";

const initialPayment = catchAsync(async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const result = await PaymentService.initialPayment(appointmentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment initialized",
      data: result,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "payment error occured");
  }
});

const validatePayment = catchAsync(async (req, res) => {
  try {
    const result = await PaymentService.validatePayment(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment validated",
      data: result,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "payment error occured");
  }
});

export const PaymentController = {
  initialPayment,
  validatePayment,
};
