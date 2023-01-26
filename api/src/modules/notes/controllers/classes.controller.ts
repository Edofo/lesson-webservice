import express, { Router } from "express";
import ClassesService from "../services/classes.service";

const ClassesRouter: Router = express.Router();

ClassesRouter.get("/", ClassesService.getAllClasses);
ClassesRouter.get("/:id", ClassesService.getClassesById);
ClassesRouter.post("/", ClassesService.createClasses);
ClassesRouter.put("/:id", ClassesService.updateClasses);
ClassesRouter.delete("/:id", ClassesService.deleteClasses);

export default ClassesRouter;
