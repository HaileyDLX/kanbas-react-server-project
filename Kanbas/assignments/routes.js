//import Database from "../Database/index.js";
import * as dao from "./dao.js";
import courseModel from "../courses/model.js";
export default function AssignmentRoutes(app){
    app.get("/api/assignments/:aid",async (req,res)=>{
        const { aid} = req.params;
        const assignment  = await dao.findAssignmentById(aid);//Database.assignments.find((a) => a._id === (aid));
        res.send(assignment);
    });
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        console.log("cid: " + cid)
        const course = await courseModel.findOne({ _id: cid });
        console.log("course: " + course)
        const courseId =  course.id.toString();
        console.log("courseId: " + courseId)
        const assignments = await dao.findAssignmentByCid(courseId);//Database.assignments.filter((a) => a.course === cid);
        console.log(assignments);
        res.send(assignments);
    });
    app.post("/api/courses/:cid/assignments", async(req, res) => {
        const { cid } = req.params;
        const newAssignment = await dao.createAssignment(req.body,cid);//{...req.body,course: cid,_id: new Date().getTime().toString(),};
        //Database.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    app.delete("/api/assignments/:aid", async(req, res) => {
        const { aid } = req.params;
        const result = await dao.deleteAssignment(aid);//Database.assignments = Database.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const aid = req.body._id;
        const assignment = req.body;
        console.log(aid);
        const result = await dao.updateAssignment(aid,assignment);
        //const assignmentIndex = Database.assignments.findIndex((a) => a._id === assignmentId);Database.assignments[assignmentIndex] = {...Database.assignments[assignmentIndex],...req.body};
        res.sendStatus(204);
    });


}