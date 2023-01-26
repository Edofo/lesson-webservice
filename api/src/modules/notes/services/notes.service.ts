import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import NotesSchema from "../../../models/notes";
import dbo from "../../../database/database";

const getModel = () => {
    const db = dbo.getDb();
    const model = db.model("Notes", NotesSchema);
    return model;
};

const NotesService = {
    async getAllNotes(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const notes = await model.find();

            return res.status(200).json({
                success: true,
                message: "Notes retrieved successfully",
                data: notes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async getNotesById(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const notes = await model.findById(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Notes retrieved successfully",
                data: notes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async createNotes(req: Request, res: Response): Promise<string | any> {
        try {
            // check if all required fields are present
            if (!req.body.name) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                    data: [],
                });
            }

            const model = getModel();

            const notes = await model.create(req.body);

            return res.status(200).json({
                success: true,
                message: "Notes created successfully",
                data: notes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async updateNotes(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const notes = await model.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

            return res.status(200).json({
                success: true,
                message: "Notes updated successfully",
                data: notes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async deleteNotes(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const notes = await model.deleteOne({ _id: new ObjectId(req.params.id) });

            return res.status(200).json({
                success: true,
                message: "Notes deleted successfully",
                data: notes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },
};

export default NotesService;
