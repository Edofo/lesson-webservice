import express, { Router } from "express";
import SubjectsService from "../services/subjects.service";

const SubjectsRouter: Router = express.Router();

SubjectsRouter.get("/", SubjectsService.getAllSubjects);
SubjectsRouter.get("/:uuid", SubjectsService.getSubjectByUuid);
SubjectsRouter.post("/", SubjectsService.createSubject);
SubjectsRouter.put("/:uuid", SubjectsService.updateSubject);
SubjectsRouter.delete("/:uuid", SubjectsService.deleteSubject);

export default SubjectsRouter;
