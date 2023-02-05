import express, { Router } from "express";

import ClassesRouter from "./classes/classes.module";
import SubjectsRouter from "./subjects/subjects.module";
import GradesRouter from "./grades/grades.module";
import StudentsRouter from "./students/students.module";
import TeachersRouter from "./teachers/teachers.module";

const AppRouter: Router = express.Router();

AppRouter.use("/classes", ClassesRouter);
AppRouter.use("/subjects", SubjectsRouter);
AppRouter.use("/grades", GradesRouter);
AppRouter.use("/students", StudentsRouter);
AppRouter.use("/teachers", TeachersRouter);

export default AppRouter;
