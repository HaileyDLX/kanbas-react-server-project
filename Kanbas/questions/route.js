import * as dao from "./dao.js";
import quizModel from "../quizzes/model.js";
function QuestionRoutes(app){
    app.get("/api/quizzes/:qid/questions", async (req, res) => {
        const qid  = req.params.qid;
        const questions  = await dao.findQuestionsByQid(qid);
        res.send(questions);
    });
    app.get("/api/questions",async (req,res)=>{
const questions = await dao .findAllQuestions();
res.send(questions);
    });
    app.get("/api/questions/:questionId",async(req,res)=>{
        const questionId = req.params.questionId;
        const question = await dao. findQuestionById(questionId);
        res.send(question);
    })

}
export default QuestionRoutes; 