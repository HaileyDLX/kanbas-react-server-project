import mongoose, { Mongoose } from "mongoose";
const questionSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true
       },
     points: Number,

      type: {
        type: String,
        required: true,
        enum: ['Fill in multiple blanks', 'True/false', 'Multiple choice'],
        default: 'Multiple choice'
      },
      options: {
        type: [String],
        default: []
      },
      answers: {
        type: [mongoose.SchemaTypes.Mixed],
        required: true
      },
      question: {
        type: String,
        required: true
      },
      quiz: {
        type: String 
        
      }
    },{collection:"questions"})
    export default questionSchema;