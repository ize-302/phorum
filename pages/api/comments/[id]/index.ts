import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../../models/comment.model";
import connectToDatabase from "../../../../middleware/mongodb";
import axios from "axios";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  if (req.method === "GET") {
    let findComments: any = await Comment.find({ postId: id });
    async function fetchUser(authorId: any) {
      return axios
        .get(`http://${req.headers.host}/api/users/${authorId}`)
        .then((response) => {
          return response.data;
        });
    }
    // get total likes
    async function fetchLikesCount(id: any) {
      return axios
        .get(`http://${req.headers.host}/api/likes/${id}/count`)
        .then((response) => {
          return response.data.likes;
        });
    }
    for (let i = 0; i < findComments.length; i++) {
      findComments[i].author = await fetchUser(findComments[i].author);
      findComments[i].likes = await fetchLikesCount(findComments[i].id);
    }
    res.json(findComments);
  }
}
