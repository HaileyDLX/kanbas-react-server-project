import quizModel from "./model.js";

export const findAllQuizzes = () => quizModel.find();

export const findQuizzesByCid = (cid) => quizModel.find({ course: cid });
export const findQuizById = (id) => quizModel.findOne({ _id: id });
export const createQuiz = (qid,quizData, cid) => {
    const quizToCreate = { id: qid, ...quizData, course: cid };
    return quizModel.create(quizToCreate);
};
export const updateQuiz = (id, quiz) =>
    quizModel.updateOne({ _id: id }, { $set: quiz });
export const deleteQuiz = (id) => quizModel.deleteOne({ _id: id });