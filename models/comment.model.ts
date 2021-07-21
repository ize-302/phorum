import mongoose from "mongoose";
const Schema = mongoose.Schema;
let mongooseHidden = require("mongoose-hidden")();

const CommentSchema = new Schema({
  postId: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Object || String, required: true },
  created: { type: String, required: true },
  updated: { type: String, required: true },
  likes: { type: Number, required: false },
});

CommentSchema.plugin(mongooseHidden, { hidden: { __v: true, _id: false } });

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
