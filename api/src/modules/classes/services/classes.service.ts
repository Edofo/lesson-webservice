import { Request, Response } from "express";

import missingValues from "../../../helpers/missingValues";
import PrismaDb from "../../../models/prisma";

const ClassesService = {
    async getAllClasses(req: Request, res: Response): Promise<string | any> {
        try {
            const classes = await PrismaDb.class.findMany({
                include: {
                    students: true,
                    subjects: true,
                    teacher: true,
                },
            });

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
        } finally {
            await PrismaDb.$disconnect();
        }
    },

    async getClassByUuid(req: Request, res: Response): Promise<string | any> {
        try {
            const classes = await PrismaDb.class.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
                include: {
                    students: true,
                    subjects: true,
                    teacher: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Class retrieved successfully",
                data: classes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        } finally {
            await PrismaDb.$disconnect();
        }
    },

    async createClass(req: Request, res: Response): Promise<string | any> {
        try {
            const acceptedFields = ["name", "teacherUuid"];

            if (missingValues(req, res, acceptedFields) !== true) {
                return;
            }

            const classes = await PrismaDb.class.create({
                data: {
                    name: req.body.name,
                    teacherUuid: req.body.teacherUuid,
                    students: {
                        connect: req.body.students,
                    },
                    subjects: {
                        connect: req.body.subjects,
                    },
                },
                include: {
                    students: true,
                    subjects: true,
                    teacher: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Class created successfully",
                data: classes,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        } finally {
            await PrismaDb.$disconnect();
        }
    },

    async updateClass(req: Request, res: Response): Promise<string | any> {
        try {

            const classes = await PrismaDb.class.update({
                where: {
                    uuid: req.params.uuid,
                },
                data: {
                    ...req.body
                },
                include: {
                    students: true,
                    subjects: true,
                    teacher: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Class updated successfully",
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
            await PrismaDb.class.delete({
                where: {
                    uuid: req.params.uuid,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Class deleted successfully",
                data: [],
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        } finally {
            await PrismaDb.$disconnect();
        }
    },
};

export default ClassesService;
