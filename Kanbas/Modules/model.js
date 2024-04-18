
import mongoose from "mongoose";
import moduleSchema from "./schema.js";
const moudleModle = mongoose.model("module",moduleSchema);
export default moudleModle;
