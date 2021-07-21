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
  if (req.method === "POST") {
    const { authorization }: any = req.headers;
    const isAuthorized = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    // find user
    const findUser: any = await User.findOne({
      _id: id,
    });
    let followers = findUser.followers;
    // remove from follower
    followers = followers.filter((follower: any) => {
      return follower !== isAuthorized.user.id;
    });
    console.log(followers);
    const updateFollowers: any = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        followers: followers,
      }
    );
    if (updateFollowers) {
      res.json({
        status: "ok",
      });
    }
  }
}
