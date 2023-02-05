import { Request, Response } from "express";

import hash from "../../../helpers/hash/hash";
import missingValues from "../../../helpers/missingValues";
import PrismaDb from "../../../models/prisma";

const TeachersService = {
    async getAllTeachers(req: Request, res: Response): Promise<string | any> {
        try {

            const teachers = await PrismaDb.teacher.findMany({
                include: {
                    classes: true,
                    grades: true,
                    subjects: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Teachers retrieved successfully",
                data: teachers,
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

    async getTeacherByUuid(req: Request, res: Response): Promise<string | any> {
        try {
            
            const teacher = await PrismaDb.teacher.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
                include: {
                    classes: true,
                    grades: true,
                    subjects: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Teacher retrieved successfully",
                data: teacher,
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

    async createTeacher(req: Request, res: Response): Promise<string | any> {
        try {
            
            const acceptedFields = ["name", "email", "password"];

            if (missingValues(req, res, acceptedFields) !== true) {
                return;
            }       
            
            const hashPwd = await hash(req.body.password)

            const teacher = await PrismaDb.teacher.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPwd,
                },
                include: {
                    classes: true,
                    grades: true,
                    subjects: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Teacher created successfully",
                data: teacher,
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

    async updateTeacher(req: Request, res: Response): Promise<string | any> {
        try {

            const teacher = await PrismaDb.teacher.findUnique({
                where: {
                    uuid: req.params.uuid,

                },
            });

            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: "Teacher not found",
                    data: [],
                });
            }

            const teachers = await PrismaDb.teacher.update({
                where: {
                    uuid: req.params.uuid,
                },
                data: {
                    ...req.body 
                },
                include: {
                    classes: true,
                    grades: true,
                    subjects: true,
                }
            });

            return res.status(200).json({
                success: true,
                message: "Teacher updated successfully",
                data: teachers,
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

    async deleteTeacher(req: Request, res: Response): Promise<string | any> {
        try {

            const teacher = await PrismaDb.teacher.findUnique({
                where: {
                    uuid: req.params.uuid,

                },
            });

            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: "Teacher not found",
                    data: [],
                });
            }

            await PrismaDb.teacher.delete({
                where: {
                    uuid: req.params.uuid,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Teacher deleted successfully",
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

export default TeachersService;
