import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import ClassesSchema from "../../../models/classes";
import dbo from "../../../database/database";

const getModel = () => {
    const db = dbo.getDb();
    const model = db.model("Classes", ClassesSchema);
    return model;
};

const ClassesService = {
    async getAllClasses(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const classes = await model.find();

            return res.status(200).json({
                success: true,
                message: "Classes retrieved successfully",
                data: classes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async getClassById(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const id = new ObjectId(req.params.id);

            console.log(id);

            const classes = await model.findById(id);

            return res.status(200).json({
                success: true,
                message: "Classes retrieved successfully",
                data: classes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async createClass(req: Request, res: Response): Promise<string | any> {
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

            const classes = await model.create(req.body);

            return res.status(200).json({
                success: true,
                message: "Classes created successfully",
                data: classes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async updateClass(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const classes = await model.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

            return res.status(200).json({
                success: true,
                message: "Classes updated successfully",
                data: classes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async deleteClass(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const classes = await model.deleteOne({ _id: new ObjectId(req.params.id) });

            return res.status(200).json({
                success: true,
                message: "Classes deleted successfully",
                data: classes,
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

export default ClassesService;
