import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "566f0025e06144",
    pass: "d0334b9387c731",
  },
});

export default transporter;
