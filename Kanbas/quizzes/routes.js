import * as dao from "./dao.js";
import courseModel from "../courses/model.js";
import {findAllQuizzes, findQuizzesByCid} from "./dao.js";
function QuizRoutes(app) {
    app.delete("/api/quizzes/:qid", async(req, res) => {
        const { qid } = req.params;
        console.log("qid: " + qid)
        const quizzes = await dao.deleteQuiz(qid);
        res.sendStatus(200);

    });
    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const newQuiz = await dao.createQuiz(cid,req.body,cid);
        res.send(newQuiz);
    });
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const cid  = req.params.cid;
        console.log("cid: " + cid)
        const course = await courseModel.findOne({ _id: cid });
        console.log("course: " + course)
        const courseId =  course.id.toString();
        console.log("courseId: " + courseId)
        const quizzes  = await dao.findQuizzesByCid(cid);
        console.log("quizzes: " + quizzes)
        res.send(quizzes);
    });
    app.get("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        res.send(quiz);
    });
    app.put("/api/quizzes/:qid", async(req, res) => {
        const { qid } = req.params;
        const quiz = req.body;
        const result= await dao.updateQuiz(qid,quiz);//Index = db.quizzes.findIndex((q) => q._id === qid);db.quizzes[quizIndex] = {...db.quizzes[quizIndex],...req.body};
        res.sendStatus(204);
    });

}
export default QuizRoutes;