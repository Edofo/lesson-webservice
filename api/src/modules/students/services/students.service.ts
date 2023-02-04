import { Request, Response } from "express";

import missingValues from "../../../helpers/missingValues";
import PrismaDb from "../../../models/prisma";

const StudentsService = {
    async getAllStudents(req: Request, res: Response): Promise<string | any> {
        try {

            const students = await PrismaDb.student.findMany({
                include: {
                    class: true,
                    grades: true,
                }
            });

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
        } finally {
            await PrismaDb.$disconnect();
        }
    },

    async getStudentByUuid(req: Request, res: Response): Promise<string | any> {
        try {
            
            const students = await PrismaDb.student.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
                include: {
                    class: true,
                    grades: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Student retrieved successfully",
                data: students,
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

    async createStudent(req: Request, res: Response): Promise<string | any> {
        try {
            
            const acceptedFields = ["name", "email", "password"];

            if (missingValues(req, res, acceptedFields) !== true) {
                return;
            }                

            const students = await PrismaDb.student.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    classUuid: req.body.classUuid || null,
                },
                include: {
                    class: true,
                    grades: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Student created successfully",
                data: students,
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

    async updateStudent(req: Request, res: Response): Promise<string | any> {
        try {

            const student = await PrismaDb.student.findUnique({
                where: {
                    uuid: req.params.uuid,

                },
            });

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found",
                    data: [],
                });
            }

            const students = await PrismaDb.student.update({
                where: {
                    uuid: req.params.uuid,
                },
                data: {
                    ...req.body 
                },
                include: {
                    class: true,
                    grades: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Student updated successfully",
                data: students,
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

    async deleteStudent(req: Request, res: Response): Promise<string | any> {
        try {

            const student = await PrismaDb.student.findUnique({
                where: {
                    uuid: req.params.uuid,

                },
            });

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found",
                    data: [],
                });
            }

            await PrismaDb.student.delete({
                where: {
                    uuid: req.params.uuid,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Student deleted successfully",
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

export default StudentsService;
