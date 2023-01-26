import express, { Router } from "express";
import CoursesService from "../services/courses.service";

const CoursesRouter: Router = express.Router();

CoursesRouter.get("/", CoursesService.getAllCourses);
CoursesRouter.get("/:id", CoursesService.getCoursesById);
CoursesRouter.post("/", CoursesService.createCourses);
CoursesRouter.put("/:id", CoursesService.updateCourses);
CoursesRouter.delete("/:id", CoursesService.deleteCourses);

export default CoursesRouter;
