import express, { Router } from "express";
import GradesService from "../services/grades.service";

const GradesRouter: Router = express.Router();

GradesRouter.get("/", GradesService.getAllGrades);
GradesRouter.get("/:uuid", GradesService.getGradeByUuid);
GradesRouter.post("/", GradesService.createGrade);
GradesRouter.put("/:uuid", GradesService.updateGrade);
GradesRouter.delete("/:uuid", GradesService.deleteGrade);

export default GradesRouter;
