import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/post.model";
import connectToDatabase from "../../../middleware/mongodb";
import axios from "axios";
import { paginationOptions } from "../../../utils/utils";

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
    const { q, page, per_page }: any = req.query;

    const query = {
      $or: [
        { title: { $regex: new RegExp(q), $options: "i" } },
        { body: { $regex: new RegExp(q), $options: "i" } },
      ],
    };

    Post.paginate(query, await paginationOptions(per_page, page))
      .then(async (result: any) => {
        // insert authors details
        for (let i = 0; i < result.items.length; i++) {
          result.items[i].author = await fetchUser(result.items[i].author);
        }
        res.json(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
