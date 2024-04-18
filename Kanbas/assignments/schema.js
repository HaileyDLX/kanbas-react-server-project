import mongoose from "mongoose"
export default mongoose.Schema(
    {id: String,
        title: String,
        course: String,
    },{collection:"assignments"}
);