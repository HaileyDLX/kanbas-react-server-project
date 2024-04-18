import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("userModel", schema);
export default model;
export const findAllUsers = () => model.find();