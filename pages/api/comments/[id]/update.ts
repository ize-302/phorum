import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../../models/comment.model";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const id = req.query.id;
    const { authorization }: any = req.headers;
    const isAuthorized : any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (_err: any, fields: { body: string }) => {
      const { body } = fields;
      if (!body) {
        res.json(messages.commentNotCreated);
      }

      const commentToUpdate = await Comment.findOneAndUpdate(
        {
          _id: id,
          author: isAuthorized.user.id,
        },
        {
          body: body,
        }
      );
      if (await commentToUpdate) {
        res.json(messages.commentUpdated);
      } else {
        res.json(messages.commentNotFound);
      }
    });
  }
}
