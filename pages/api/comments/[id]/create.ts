import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../../models/comment.model";
import Post from "../../../../models/post.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";
import formidable from "formidable";

connectToDatabase();

//set bodyparser
export const config = {
  api: {
    bodyParser: false, //set bodyparser for formidable
    externalResolver: true,
  },
};

type Data = {
  message?: string;
  success: boolean;
  comments?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const postId = req.query.id;
    const { authorization }: any = req.headers;
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    // check if post exists
    const findPost: any = await Post.findById(postId);
    if (!findPost) {
      return res.json(messages.postNotFound);
    }
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields: any, files) => {
      const { body } = fields;
      if (!body) {
        res.json(messages.commentNotCreated);
      }

      const comment = await Comment.create({
        postId: postId,
        body,
        author: isAuthorized.user.id,
        created: new Date(),
        updated: new Date(),
      });
      if (await comment) {
        res.json(messages.commentCreated);
      }
    });
  }
}
