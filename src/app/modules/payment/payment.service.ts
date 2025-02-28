import axios from "axios";
import prisma from "../../../shared/prisma";
import { SSLService } from "../SSL/sss.service";
import { config } from "../../../config";
import { PaymentStatus } from "@prisma/client";

const initialPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    contactNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);
  return {
    paymentUrl: result.GatewayPageURL,
  };
};

// amount=1150.00&bank_tran_id=151114130739MqCBNx5&card_brand=VISA&card_issuer=BRAC+BANK%2C+LTD.&card_issuer_country=Bangladesh&card_issuer_country_code=BD&card_no=432149XXXXXX0667&card_type=VISA-Brac+bank¤cy=BDT&status=VALID&store_amount=1104.00&store_id=progr67931e8fc091f&tran_date=2015-11-14+13%3A07%3A12&tran_id=5646dd9d4b484&val_id=151114130742Bj94IBUk4uE5GRj&verify_sign=038598d08752636f2013c13915cafbb0&verify_key=amount%2Cbank_tran_id%2Ccard_brand%2Ccard_issuer%2Ccard_issuer_country%2Ccard_issuer_country_code%2Ccard_no%2Ccard_type%2Ccurrency%2Cstatus%2Cstore_amount%2Cstore_id%2Ctran_date%2Ctran_id%2Cval_id

const validatePayment = async (payload: any) => {
  if (!payload || !payload.status || payload.status !== "VALID") {
    return {
      message: "Invalid payment",
    };
  }

  const response = await axios({
    method: "GET",
    url: `${config.ssl.sslValidationAPI}?val_id=${payload.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePassword}&format=json`,
  });

  if (
    !response.data ||
    !response.data.status ||
    response.data.status !== "VALID"
  ) {
    return {
      message: "Invalid payment",
    };
  }

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.data.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response.data,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });
  return {
    message: "Payment success!",
  };
};

export const PaymentService = {
  initialPayment,
  validatePayment,
};
