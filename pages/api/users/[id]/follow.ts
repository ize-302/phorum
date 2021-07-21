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
    if (id === isAuthorized.user.id) {
      return res.json({
        message: "Can't follow self",
        success: false,
      });
    }
    let followers = findUser.followers;
    // check if already following
    const alreadyFollowing = followers.find((follower) => {
      return follower === isAuthorized.user.id;
    });
    if (alreadyFollowing) {
      return res.json({
        message: "Already following",
        success: false,
      });
    }
    // add to followers
    followers.unshift(isAuthorized.user.id);
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
