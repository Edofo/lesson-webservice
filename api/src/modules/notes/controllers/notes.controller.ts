import express, { Router } from "express";
import NotesService from "../services/notes.service";

const NotesRouter: Router = express.Router();

NotesRouter.get("/", NotesService.getAllNotes);
NotesRouter.get("/:id", NotesService.getNotesById);
NotesRouter.post("/", NotesService.createNotes);
NotesRouter.put("/:id", NotesService.updateNotes);
NotesRouter.delete("/:id", NotesService.deleteNotes);

export default NotesRouter;
