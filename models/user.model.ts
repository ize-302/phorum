import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongoosePaginate from "mongoose-paginate-v2";
let mongooseHidden = require("mongoose-hidden")();

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, hide: true },
  joined: { type: String, required: true },
  role: { type: String, required: true },
  followers: { type: Array, required: true },
  following: { type: Array, required: true },
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseHidden, { hidden: { __v: true, _id: false } });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
