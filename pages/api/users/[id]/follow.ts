import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user.model";
import connectToDatabase from "../../../../middleware/mongodb";
import { verifyToken } from "../../../../utils/utils";
import messages from "../../../../utils/messages";

connectToDatabase();

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
    // AUTHORIZATION
    const { authorization }: any = req.headers;
    const isAuthorized = verifyToken(authorization);
    if (!isAuthorized) {
      return res.json(messages.notAuthorized);
    }
    // VALIDATION
    if (id === isAuthorized.user.id) {
      return res.json({
        message: "Can't follow self",
        success: false,
      });
    }
    // HANDLE FOLLOWER'S FOR FOLLOWEE
    // get followee details
    const followee: any = await User.findOne({
      _id: id,
    });
    let followers = followee.followers;
    // check if follower already following
    const isFollowing = followers.find((follower) => {
      return follower === isAuthorized.user.id;
    });
    if (isFollowing) {
      return res.json({
        message: "Already following",
        success: false,
      });
    }
    // add to followee's followers list
    followers.unshift(isAuthorized.user.id);
    const updateFollowers: any = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        followers: followers,
      }
    );
    // HANDLE FOLLWING FOR FOLLOWER's FOLLOWERS
    // get followe's details
    let follower: any = await User.findOne({
      _id: isAuthorized.user.id,
    });
    let following = follower.following;
    // add  followee to follower's following list
    following.unshift(id);
    const updateFollowing: any = await User.findOneAndUpdate(
      {
        _id: isAuthorized.user.id,
      },
      {
        following: following,
      }
    );

    if (updateFollowers && updateFollowing) {
      res.json({
        status: "ok",
      });
    }
  }
}
