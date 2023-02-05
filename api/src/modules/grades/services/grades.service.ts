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
            const grade = await PrismaDb.grade.findUnique({
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
                data: grade,
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

            const acceptedFields = ["value", "studentUuid", "subjectUuid", "teacherUuid"];

            if (missingValues(req, res, acceptedFields) !== true) {
                return;
            }

            // Check if student exists
            const student = await PrismaDb.student.findUnique({
                where: {
                    uuid: req.body.studentUuid,
                }
            });

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found",
                    data: [],
                });
            }
            

            // Check if subject exists
            const subject = await PrismaDb.subject.findUnique({
                where: {
                    uuid: req.body.subjectUuid,
                }
            });

            if (!subject) {
                return res.status(404).json({
                    success: false,
                    message: "Subject not found",
                    data: [],
                });
            }

            // Check if teacher exists  
            const teacher = await PrismaDb.teacher.findUnique({
                where: {
                    uuid: req.body.teacherUuid,
                }
            });

            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: "Teacher not found",
                    data: [],
                });
            }
        
            const grades = await PrismaDb.grade.create({
                data: {
                    value: req.body.value,
                    date: req.body.date || new Date(),
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

    async updateGrade(req: Request, res: Response): Promise<string | any> {
        try {

            const grade = await PrismaDb.grade.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
            });

            if (!grade) {
                return res.status(404).json({
                    success: false,
                    message: "Grade not found",
                    data: [],
                });
            }

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
        } finally {
            await PrismaDb.$disconnect();
        }
    },

    async deleteGrade(req: Request, res: Response): Promise<string | any> {
        try {

            const grade = await PrismaDb.grade.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
            });

            if (!grade) {
                return res.status(404).json({
                    success: false,
                    message: "Grade not found",
                    data: [],
                });
            }

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
        } finally {
            await PrismaDb.$disconnect();
        }
    },
};

export default GradesService;
