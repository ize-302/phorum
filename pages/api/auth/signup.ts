import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import bcrypt from "bcrypt";
import connectToDatabase from "../../../middleware/mongodb";
import { validateEmail } from "../../../utils/utils";
import messages from "../../../utils/messages";

connectToDatabase();

type Data = {
  token?: string;
  message?: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, username, password } = req.body;
    // validate email
    if (!validateEmail(email)) {
      return res.json(messages.invalidEmail);
    }
    if (!username || !password) {
      return res.json({
        message: "Fill in the form",
        success: false,
      });
    }
    const user = await User.findOne({
      $or: [
        {
          email: email.toLowerCase(),
        },
        {
          username: username.toLowerCase(),
        },
      ],
    });

    if (user) {
      if (user.email === email.toLowerCase()) {
        return res.json({
          message: "email already registered",
          success: false,
        });
      } else if (user.username === username.toLowerCase()) {
        return res.json({
          message: "username already registered",
          success: false,
        });
      }
    } else {
      const user = await User.create({
        password: bcrypt.hashSync(password, 10),
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        joined: new Date(),
        role: "user",
      });
      req.body.password = undefined;
      if (user) {
        res.json({
          success: true,
          message: "Sign up successful. Login now!",
        });
      }
    }
  }
}
