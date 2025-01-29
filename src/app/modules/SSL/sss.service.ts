import axios from "axios";
import { config } from "../../../config";

const initPayment = async (paymentData: any) => {
  console.log({ paymentData });

  const data = {
    store_id: config.ssl.storeId,
    store_passwd: config.ssl.storePassword,
    total_amount: 100,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: config.ssl.successURl,
    fail_url: config.ssl.failURl,
    cancel_url: config.ssl.cancelURl,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: paymentData.name,
    cus_email: paymentData.email,
    cus_add1: paymentData.address,
    cus_add2: "N/A",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: paymentData.contactNumber,
    cus_fax: "01711111111",
    ship_name: "N/A",
    ship_add1: "N/A",
    ship_add2: "N/A",
    ship_city: "N/A",
    ship_state: "N/A",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await axios({
    method: "POST",
    url: config.ssl.sslPaymentAPI,
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  // console.log({ response });
  return response.data;
};

export const SSLService = {
  initPayment,
};
