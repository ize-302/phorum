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
    // AUTHoRIZATION
    const { authorization }: any = req.headers;
    const isAuthorized : any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    // HANDLE UNFOLLOW FOR FOLLOWEE
    // find followee's details
    const followee: any = await User.findOne({
      _id: id,
    });
    let followers = followee.followers;
    // remove follower from followee's followers list
    followers = followers.filter((follower: any) => {
      return follower !== isAuthorized.user.id;
    });
    const updateFollowers: any = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        followers: followers,
      }
    );
    // HANDLE UNFOLLOW FOR FOLLOWER
    // find follower's details
    const follower: any = await User.findOne({
      _id: isAuthorized.user.id,
    });
    let following = follower.following;
    following = following.filter((followee: any) => {
      return followee !== id;
    });
    const updateFollowing: any = await User.findOneAndUpdate(
      {
        _id: isAuthorized.user.id,
      },
      {
        following: following,
      }
    );
    // remove from follwoing
    if (updateFollowers && updateFollowing) {
      res.json({
        status: "ok",
      });
    }
  }
}
