import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import connectToDatabase from "../../../middleware/mongodb";
import { paginationOptions } from "../../../utils/utils";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { q, page, per_page }: any = req.query;

    const query = {
      $or: [
        { username: { $regex: new RegExp(q), $options: "i" } },
        { email: { $regex: new RegExp(q), $options: "i" } },
      ],
    };

    User.paginate(query, await paginationOptions(per_page, page))
      .then((result: any) => {
        res.json(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
