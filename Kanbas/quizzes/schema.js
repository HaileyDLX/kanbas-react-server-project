import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
                                            id: { type: String},
                                           title: { type: String },
                                           description: { type: String},
                                           quizType: {
                                               type: String,
                                               enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
                                               default: "Graded Quiz"
                                           },
                                           points: { type: Number },
                                           assignmentGroup: {
                                               type: String,
                                               enum: ["Quizzes", "Exams", "Assignments", "Project"],
                                               default: "Quizzes"
                                           },
                                           shuffleAnswers: { type: Boolean, default: true },
                                           timeLimit: { type: Number, default: 20 },
                                           multipleAttempts: { type: Boolean, default: false },
                                           showCorrectAnswers: { type: Boolean, default: false },
                                           accessCode: { type: String },
                                           oneQuestionAtATime: { type: Boolean, default: false },
                                           webcamRequired: { type: Boolean, default: true },
                                           lockQuestionsAfterAnswering: { type: Boolean, default: false },
                                           dueDate: { type: Date },
                                           availableDate: { type: Date },
                                           untilDate: { type: Date },
                                           course: String,
                                       }, { collection: "quizzes" });

export default quizSchema;
