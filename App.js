
import express from 'express';
import Hello from './hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import mongoose from 'mongoose';
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import QuizRoutes from "./Kanbas/quizzes/routes.js";
import "dotenv/config";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);


//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
// app.use(
//     cors({
//              credentials: true,
//              origin: process.env.FRONTEND_URL
//          })
// );
app.use(cors({
                 origin: true,
                 credentials: true
             }));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));


app.use(express.json());


ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);
// process.on( 'uncaughtException', (error) => {
//     console.error('Uncaught Exception:', error);
// });
//
// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });


app.listen( process.env.PORT || 4000);
