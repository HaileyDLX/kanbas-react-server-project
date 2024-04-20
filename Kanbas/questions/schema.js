import mongoose, { Mongoose } from "mongoose";
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true,
        enum: ['blank', 'truefalse', 'MultipleChoice']
      },
      options: {
        type: [String],
        default: []
      },
      answers: {
        type: [mongoose.SchemaTypes.Mixed], // 使用Mixed类型以允许数组内有不同类型的数据
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