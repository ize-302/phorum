import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../../models/post.model";
import connectToDatabase from "../../../../middleware/mongodb";
import axios from "axios";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get author detail
  async function fetchUser(authorId: any) {
    return axios
      .get(`http://${req.headers.host}/api/users/${authorId}`)
      .then((response) => {
        return response.data;
      });
  }
  if (req.method === "GET") {
    const id = req.query.id;
    let findPosts: any = await Post.find({ author: id }).limit(10);
    if (req.query.q) {
      findPosts = await Post.find({
        $or: [
          { title: { $regex: req.query.q } },
          { body: { $regex: req.query.q } },
        ],
      }).limit(10);
    }
    for (let i = 0; i < findPosts.length; i++) {
      findPosts[i].author = await fetchUser(findPosts[i].author);
    }
    res.json(findPosts);
  }
}
