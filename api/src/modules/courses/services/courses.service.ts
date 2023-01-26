import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import CoursesSchema from "../../../models/courses";
import dbo from "../../../database/database";

const getModel = () => {
    const db = dbo.getDb();
    const model = db.model("Courses", CoursesSchema);
    return model;
};

const CoursesService = {
    async getAllCourses(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const courses = await model.find();

            return res.status(200).json({
                success: true,
                message: "Courses retrieved successfully",
                data: courses,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async getCoursesById(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const courses = await model.findById(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Courses retrieved successfully",
                data: courses,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async createCourses(req: Request, res: Response): Promise<string | any> {
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

            const courses = await model.create(req.body);

            return res.status(200).json({
                success: true,
                message: "Courses created successfully",
                data: courses,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async updateCourses(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const courses = await model.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

            return res.status(200).json({
                success: true,
                message: "Courses updated successfully",
                data: courses,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async deleteCourses(req: Request, res: Response): Promise<string | any> {
        try {
            const model = getModel();

            const courses = await model.deleteOne({ _id: new ObjectId(req.params.id) });

            return res.status(200).json({
                success: true,
                message: "Courses deleted successfully",
                data: courses,
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

export default CoursesService;
