import type { NextApiRequest, NextApiResponse } from "next";
import Like from "../../../../models/like.model";
import connectToDatabase from "../../../../middleware/mongodb";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const parentId = req.query.id;
    const likes = await Like.find({
      parentId: parentId,
    });

    if (await likes) {
      res.json({ likes: likes.length });
    }
  }
}
