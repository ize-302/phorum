import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/post.model";
import connectToDatabase from "../../../middleware/mongodb";
import { verifyToken } from "../../../utils/utils";
import messages from "../../../utils/messages";
import formidable from "formidable";

connectToDatabase();

//set bodyparser
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
  if (req.method === "POST") {
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
        if (!title || !body) {
          res.json(messages.postNotCreated);
        }
        const post = Post.create({
          title,
          body,
          author: isAuthorized.user.id,
          created: new Date(),
          updated: new Date(),
        });
        if (await post) {
          res.json(messages.postCreated);
        }
      }
    );
  }
}
