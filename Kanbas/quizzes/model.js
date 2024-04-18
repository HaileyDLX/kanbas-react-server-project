import mongoose from "mongoose";
import quizSchema from "./schema.js";
const quizModel = mongoose.model("quiz",quizSchema);
export default quizModel;
