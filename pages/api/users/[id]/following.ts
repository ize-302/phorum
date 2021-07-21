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
  if (req.method === "GET") {
    // fetch user detail
    async function fetchUser(userId: any) {
      return axios
        .get(`http://${req.headers.host}/api/users/${userId}`)
        .then((response) => {
          return response.data;
        });
    }
    // get following
    const findUser = await User.findOne({ _id: id });
    let followingsIds = findUser.followings;
    let followings = [];

    for (let i = 0; i < followingsIds.length; i++) {
      let following = await fetchUser(followingsIds[i]);
      followings.push(following);
    }
    res.json(followings);
  }
}
