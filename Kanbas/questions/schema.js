
import mongoose, { Mongoose } from "mongoose";
const questionSchema = new mongoose.Schema({
                                               title: {
                                                   type: String,

                                               },
                                               points: Number,

                                               type: {
                                                   type: String,

                                                   enum: ['Fill in Blanks', 'True/False', 'MultipleChoice'],
                                                   default: 'MultipleChoice'
                                               },
                                               options: {
                                                   type: [String],
                                                   default: []
                                               },
                                               answers: {
                                                   type: [mongoose.SchemaTypes.Mixed],

                                               },
                                               question: {
                                                   type: String,

                                               },
                                               quiz: {
                                                   type: String

                                               }
                                           },{collection:"questions"})
export default questionSchema;