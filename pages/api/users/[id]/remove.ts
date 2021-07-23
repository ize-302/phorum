import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";

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
  const id = req.query.id;
  if (req.method === "DELETE") {
    const { authorization }: any = req.headers;
    const isAuthorized : any = verifyToken(authorization);

    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }

    // find user
    const findUser: any = await User.findOne({
      _id: id,
    });
    if (!findUser) {
      res.json(messages.userNotFound);
    }

    // delete user
    const removeUser = async () => {
      const userToDelete: any = await User.findOneAndRemove({
        _id: id,
      });
      if (userToDelete) {
        res.json(messages.userDeleted);
      }
    };

    if (isAuthorized.user.role === "admin") {
      removeUser();
    } else {
      if (isAuthorized.user.id === id) {
        removeUser();
      } else {
        return res.json(messages.notAuthorized);
      }
    }
  }
}
