import { Request, Response } from "express";

import PrismaDb from "../../../models/prisma";
import missingValues from "../../../helpers/missingValues";

const GradesService = {
    async getAllGrades(req: Request, res: Response): Promise<string | any> {
        try {

            const grades = await PrismaDb.grade.findMany({
                include: {
                    student: true,
                    subject: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Grades retrieved successfully",
                data: grades,
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

    async getGradeByUuid(req: Request, res: Response): Promise<string | any> {
        try {
            const grades = await PrismaDb.grade.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
                include: {
                    student: true,
                    subject: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Grade retrieved successfully",
                data: grades,
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

    async createGrade(req: Request, res: Response): Promise<string | any> {
        try {

            const acceptedFields = ["value", "date", "studentUuid", "subjectUuid", "teacherUuid"];

            if (missingValues(req, res, acceptedFields) !== true) {
                return;
            }
        
            const Grades = await PrismaDb.grade.create({
                data: {
                    value: req.body.value,
                    date: req.body.date,
                    studentUuid: req.body.studentUuid,
                    subjectUuid: req.body.subjectUuid,
                    teacherUuid: req.body.teacherUuid,
                },
                include: {
                    student: true,
                    subject: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Grade created successfully",
                data: Grades,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async updateGrade(req: Request, res: Response): Promise<string | any> {
        try {

            const Grades = await PrismaDb.grade.update({
                where: {
                    uuid: req.params.uuid,
                },
                data: {
                    ...req.body
                },
                include: {
                    student: true,
                    subject: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Grade updated successfully",
                data: Grades,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message,
                data: [],
            });
        }
    },

    async deleteGrade(req: Request, res: Response): Promise<string | any> {
        try {

            await PrismaDb.grade.delete({
                where: {
                    uuid: req.params.uuid,
                },
            })

            return res.status(200).json({
                success: true,
                message: "Grade deleted successfully",
                data: [],
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

export default GradesService;
