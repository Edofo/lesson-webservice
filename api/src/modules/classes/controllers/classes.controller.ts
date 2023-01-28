import express, { Router } from "express";
import ClassesService from "../services/classes.service";

const ClassesRouter: Router = express.Router();

ClassesRouter.get("/", ClassesService.getAllClasses);
ClassesRouter.get("/:uuid", ClassesService.getClassByUuid);
ClassesRouter.post("/", ClassesService.createClass);
ClassesRouter.put("/:uuid", ClassesService.updateClass);
ClassesRouter.delete("/:uuid", ClassesService.deleteClass);

export default ClassesRouter;
