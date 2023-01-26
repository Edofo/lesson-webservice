import express, { Router } from "express";

import ClassesRouter from "./classes/classes.module";
import CoursesRouter from "./courses/courses.module";
import NotesRouter from "./notes/notes.module";
import StudentsRouter from "./students/students.module";

const AppRouter: Router = express.Router();

AppRouter.use("/classes", ClassesRouter);
AppRouter.use("/courses", CoursesRouter);
AppRouter.use("/notes", NotesRouter);
AppRouter.use("/students", StudentsRouter);

export default AppRouter;
