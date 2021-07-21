import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../../models/post.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  if (req.method === "DELETE") {
    const { authorization }: any = req.headers;
    const isAuthorized = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    const postToDelete: any = await Post.findOneAndRemove({
      _id: id,
      author: isAuthorized.user.id,
    });
    if (postToDelete) {
      res.json(messages.postDeleted);
    } else {
      res.json(messages.postNotFound);
    }
  }
}
