import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";
import bcrypt from "bcrypt";
import User from "../../../../models/user.model";

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
  // used to reset password if password reset link is successfully validated
  if (req.method === "PATCH") {
    const { newPassword, repeatNewPassword } = req.body;
    const { authorization }: any = req.headers;
    const isAuthorized : any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    if (newPassword !== repeatNewPassword) {
      return res.json({ message: "Password don't match", success: false });
    }

    const user = await User.findOneAndUpdate(
      {
        _id: isAuthorized.user.id,
      },
      {
        password: bcrypt.hashSync(newPassword, 10),
      }
    );

    if (user) {
      res.json({
        success: true,
        message: "password updated",
      });
    }
  }
}
