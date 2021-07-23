import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongoosePaginate from "mongoose-paginate-v2";
let mongooseHidden = require("mongoose-hidden")();

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Object || String, required: true },
  created: { type: String, required: true },
  updated: { type: String, required: true },
  likes: { type: Number || String, required: false },
});

postSchema.plugin(mongoosePaginate);
postSchema.plugin(mongooseHidden, { hidden: { __v: true, _id: false } });

const Post = mongoose.model("Post", postSchema);

export default Post;
