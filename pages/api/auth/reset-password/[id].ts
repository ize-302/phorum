import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";

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
  // Validate password reset link
  // called when reset password page is visited
  if (req.method === "GET") {
    const token: any = req.query.id;
    const isValid: any = verifyToken(token);
    if (!isValid) {
      return res.json({
        message: "Link has expired. Resend password link again",
        success: false,
      });
    }
    const { id } = isValid.user;
    return res.json({ userId: id });
  }
}
