import express, { Router } from "express";
import ClassesService from "../services/classes.service";

const ClassesRouter: Router = express.Router();

ClassesRouter.get("/", ClassesService.getAllClasses);
ClassesRouter.get("/:id", ClassesService.getClassById);
ClassesRouter.post("/", ClassesService.createClass);
ClassesRouter.put("/:id", ClassesService.updateClass);
ClassesRouter.delete("/:id", ClassesService.deleteClass);

export default ClassesRouter;
