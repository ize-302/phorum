import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import connectToDatabase from "../../../middleware/mongodb";
import jwt from "jsonwebtoken";
import transporter from "../../../utils/nodemailer";
import { validateEmail } from "../../../utils/utils";
import messages from "../../../utils/messages";

connectToDatabase();

//set bodyparser
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

    // validate email
    if (!validateEmail(email)) {
      return res.json(messages.invalidEmail);
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.json({
        message: "User not found!",
        success: false,
      });
    }
    // generate token
    const token = await jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h", algorithm: "HS256" }
    );

    // send mail
    const mailOptions = {
      from: "phorum",
      to: email,
      subject: "Forgot password link",
      text: "The reset password link",
      html:
        "<p><a href='http://localhost:3000/api/auth/reset-password/" +
        token +
        "'>Reset Password</a>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          message: "Reset password link sent",
          success: true,
        });
      }
    });
  }
}
