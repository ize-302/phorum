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
    // get user's following
    const findUser = await User.findOne({ _id: id });
    let followingIds = findUser.following;
    let following: any = [];

    for (let i = 0; i < followingIds.length; i++) {
      let user = await fetchUser(followingIds[i]);
      following.push(user);
    }
    res.json(following);
  }
}
