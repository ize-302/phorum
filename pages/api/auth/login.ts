import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import connectToDatabase from "../../../middleware/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: email.toLowerCase() }],
    });

    if (!user) {
      return res.json({
        message: "User not found!",
        success: false,
      });
    }
    if (bcrypt.compareSync(password.toLowerCase(), user.password)) {
      req.body.password = undefined;
      const token = await jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            joined: user.joined,
            role: user.role,
          },
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "1h", algorithm: "HS256" }
      );

      res.status(200).json({
        token: "Bearer " + token,
        message: "Sign in successful!",
        success: true,
      });
    } else {
      res.send({ message: "Invalid login details!", success: false });
    }
  }
}
