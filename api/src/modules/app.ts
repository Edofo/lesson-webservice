import express, { Router } from "express";

import ClassesRouter from "./classes/classes.module";
import StudentsRouter from "./students/students.module";

const AppRouter: Router = express.Router();

AppRouter.use("/classes", ClassesRouter);
AppRouter.use("/students", StudentsRouter);

export default AppRouter;
