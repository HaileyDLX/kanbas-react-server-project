
import * as dao from "./dao.js";
import mongoose from 'mongoose';
//import Database from "../Database/index.js";
export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    // app.post("/api/courses",async (req,res)=>{
    //     const course = req.body;
    //     await dao.createCourse(course);
    //     // const course ={...req.body,_id:new Date().getTime().toString()};
    //     // Database.courses.push(course);
    //     res.send(course);
    // });

    app.post("/api/courses", async (req, res) => {
        const course = req.body;
        course.id = course.number;
        course._id = new mongoose.Types.ObjectId();
        // course.image = 'images/reactjs.png';
        await dao.createCourse(course);

        res.send(course);
    });


    app.delete("/api/courses/:id",async (req,res)=>{
        const {id} = req.params;
        await dao.deleteCourse(id);
        res.sendStatus(204);
    });
    app.put("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const course = req.body;
        await dao.updateCourse(id, course);
        res.sendStatus(204);
    });
    app.get("/api/courses/:id", async (req, res) => {
        const courseId = req.params.id;
        const course = await dao.findCourseById(courseId);
        // if (!course) {
        //     res.status(404).send("Course not found");
        //     return;
        // }
        res.send(course);
    });

}
