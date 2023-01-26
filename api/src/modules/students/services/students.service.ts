import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import StudentsSchema from "../../../models/students";
import dbo from "../../../database/database";

const getModel = () => {
    const db = dbo.getDb();
    const model = db.model("Students", StudentsSchema);
    return model;
};

const StudentsService = {
    async getAllStudents(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const students = await model.find();

            return res.status(200).json({
                success: true,
                message: "Students retrieved successfully",
                data: students,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async getStudentsById(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const students = await model.findById(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Students retrieved successfully",
                data: students,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async createStudents(req: Request, res: Response): Promise<string | any> {
        try {
            // check if all required fields are present
            if (!req.body.name || !req.body.email || !req.body.lastname) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                    data: [],
                });
            }

            const model = getModel();

            const students = await model.create(req.body);

            return res.status(200).json({
                success: true,
                message: "Students created successfully",
                data: students,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async updateStudents(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const students = await model.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

            return res.status(200).json({
                success: true,
                message: "Students updated successfully",
                data: students,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async deleteStudents(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const students = await model.deleteOne({ _id: new ObjectId(req.params.id) });

            return res.status(200).json({
                success: true,
                message: "Students deleted successfully",
                data: students,
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

export default StudentsService;
