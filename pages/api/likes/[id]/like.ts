import type { NextApiRequest, NextApiResponse } from "next";
import Like from "../../../../models/like.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const parentId = req.query.id;
    const { authorization }: any = req.headers;
    const isAuthorized = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    // check if user already sent like
    const userAlreadyLike = await Like.findOne({
      author: isAuthorized.user.id,
      parentId: parentId,
    });
    if (userAlreadyLike) {
      return res.json({ message: "Already liked" });
    }
    const like = await Like.create({
      parentId: parentId,
      author: isAuthorized.user.id,
    });
    if (await like) {
      res.json({ status: "ok" });
    }
  }
}
