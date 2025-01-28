import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/response";
import { PaymentService } from "./payment.service";

const initialPayment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;

  const result = await PaymentService.initialPayment(appointmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialized",
    data: result,
  });
});

export const PaymentController = {
  initialPayment,
};
