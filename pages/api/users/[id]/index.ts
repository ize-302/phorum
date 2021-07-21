import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user.model";
import connectToDatabase from "../../../../middleware/mongodb";
import messages from "../../../../utils/messages";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id;
    const findUser: any = await User.findOne(
      { _id: id },
      { password: 0, __v: 0 }
    );
    if (!findUser) {
      res.json(messages.userNotFound);
    } else {
      return res.json(findUser);
    }
  }
}
