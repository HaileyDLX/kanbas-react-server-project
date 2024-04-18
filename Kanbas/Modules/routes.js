import * as dao from "./dao.js";
import courseModel from "../courses/model.js";
function ModuleRoutes(app) {
    app.delete("/api/modules/:mid", async(req, res) => {
        const { mid } = req.params;

        //db.modules = db.modules.filter((m) => m._id !== mid);
        const modules = await dao.deleteModule(mid);
        res.sendStatus(200);

    });
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;

        const newModule = await dao.createModule(req.body,cid);//{ ...req.body,course: cid,_id: new Date().getTime().toString(),};
        //db.modules.push(newModule);
        res.send(newModule);
    });
    app.get("/api/courses/:cid/modules", async (req, res) => {
        const cid  = req.params.cid;
        console.log("cid: " + cid)
        const course = await courseModel.findOne({ _id: cid });
        console.log("course: " + course)
        const courseId =  course.id.toString();
        console.log("courseId: " + courseId)
        const modules  = await dao.findModuleByCid(cid);//db.modules.filter((m) => m.course === cid);
        // const modules = db.modules
        //     .filter((m) => m.course === cid);
        console.log("modules: " + modules)
        res.send(modules);
    });
    app.put("/api/modules/:mid", async(req, res) => {
        const { mid } = req.params;
        const module = req.body;
        const result= await dao.updateModule(mid,module);//Index = db.modules.findIndex((m) => m._id === mid);db.modules[moduleIndex] = {...db.modules[moduleIndex],...req.body};
        res.sendStatus(204);
    });

}



export default ModuleRoutes;