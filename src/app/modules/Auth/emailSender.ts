import nodemailer from "nodemailer";
import { config } from "../../../config";

export const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Health Care 👻" <rifatr729@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset password link", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });

    // console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};
