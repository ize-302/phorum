import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../../models/comment.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const id = req.query.id;
    const { authorization }: any = req.headers;
    const isAuthorized = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }

    const commentToDelete: any = await Comment.findOneAndRemove({
      _id: id,
      author: isAuthorized.user.id,
    });
    if (commentToDelete) {
      res.json(messages.commentDeleted);
    } else {
      res.json(messages.commentNotFound);
    }
  }
}
