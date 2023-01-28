import express, { Router } from "express";
import StudentsService from "../services/students.service";

const StudentsRouter: Router = express.Router();

StudentsRouter.get("/", StudentsService.getAllStudents);
StudentsRouter.get("/:uuid", StudentsService.getStudentByUuid);
StudentsRouter.post("/", StudentsService.createStudent);
StudentsRouter.put("/:uuid", StudentsService.updateStudent);
StudentsRouter.delete("/:uuid", StudentsService.deleteStudent);

export default StudentsRouter;
