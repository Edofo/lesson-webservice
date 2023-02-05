import express, { Router } from "express";
import TeachersService from "../services/teachers.service";

const TeachersRouter: Router = express.Router();

TeachersRouter.get("/", TeachersService.getAllTeachers);
TeachersRouter.get("/:uuid", TeachersService.getTeacherByUuid);
TeachersRouter.post("/", TeachersService.createTeacher);
TeachersRouter.put("/:uuid", TeachersService.updateTeacher);
TeachersRouter.delete("/:uuid", TeachersService.deleteTeacher);

export default TeachersRouter;
