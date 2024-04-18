import mongoose from "mongoose";
import assignmentSchema from "./schema.js";
const assignmentModule = mongoose.model("Assignments",assignmentSchema);
export default assignmentModule;