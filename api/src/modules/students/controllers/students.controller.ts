import express, { Router } from "express";
import StudentsService from "../services/students.service";

const StudentsRouter: Router = express.Router();

StudentsRouter.get("/", StudentsService.getAllStudents);
StudentsRouter.get("/:id", StudentsService.getStudentsById);
StudentsRouter.post("/", StudentsService.createStudents);
StudentsRouter.put("/:id", StudentsService.updateStudents);
StudentsRouter.delete("/:id", StudentsService.deleteStudents);

export default StudentsRouter;
