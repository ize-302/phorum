import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user.model";
import connectToDatabase from "../../../../middleware/mongodb";
import messages from "../../../../utils/messages";
import axios from "axios";

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
  // fetch user detail
  async function fetchUser(userId: any) {
    return axios
      .get(`http://${req.headers.host}/api/users/${userId}`)
      .then((response) => {
        return response.data;
      });
  }
  if (req.method === "GET") {
    // get followers
    const findUser = await User.findOne({ _id: id });
    let followersIds = findUser.followers;
    let followers = [];

    for (let i = 0; i < followersIds.length; i++) {
      let follower = await fetchUser(followersIds[i]);
      followers.push(follower);
    }
    res.json(followers);
  }
}
