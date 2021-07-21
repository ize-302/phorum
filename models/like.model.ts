import mongoose from "mongoose";
const Schema = mongoose.Schema;
let mongooseHidden = require("mongoose-hidden")();

const LikeSchema = new Schema({
  parentId: { type: String, required: true }, // parentId represents comment or post id
  author: { type: Object || String, required: true },
});

LikeSchema.plugin(mongooseHidden, { hidden: { __v: true, _id: false } });

const Like = mongoose.models.Like || mongoose.model("Like", LikeSchema);

export default Like;
