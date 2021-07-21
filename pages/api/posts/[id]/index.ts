import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../../models/post.model";
import connectToDatabase from "../../../../middleware/mongodb";
import axios from "axios";
import messages from "../../../../utils/messages";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id;
    const findPost: any = await Post.findById(id);
    if (!findPost) {
      res.json(messages.postNotFound);
    } else {
      // get author detail
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
      let author = await fetchUser(findPost.author);
      findPost.author = author;

      let likes = await fetchLikesCount(id);
      findPost.likes = likes;
      return res.json(findPost);
    }
  }
}
