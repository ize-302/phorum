import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../../models/post.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";
import formidable from "formidable";

connectToDatabase();

export const config = {
  api: {
    bodyParser: false, //set bodyparser for formidable
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { authorization }: any = req.headers;
    const isAuthorized = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    const form = new formidable.IncomingForm();
    form.parse(
      req,
      async (_err: any, fields: { title: string; body: string }) => {
        const { title, body } = fields;
        const id = req.query.id;
        const postToUpdate = await Post.findById(id);
        if (!postToUpdate) {
          return res.json(messages.postNotFound);
        }
        const post = await Post.findOneAndUpdate(
          {
            _id: id,
            author: isAuthorized.user.id,
          },
          {
            title: title || postToUpdate.title,
            body: body || postToUpdate.body,
          }
        );
        if (post) {
          res.json(messages.postUpdated);
        } else {
          return res.json(messages.notAuthorized);
        }
      }
    );
  }
}
