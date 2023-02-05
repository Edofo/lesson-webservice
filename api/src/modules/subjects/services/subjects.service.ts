import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import missingValues from "../../../helpers/missingValues";
import PrismaDb from "../../../models/prisma";

const SubjectsService = {
    async getAllSubjects(req: Request, res: Response): Promise<string | any> {
        try {
            const subjects = await PrismaDb.subject.findMany({
                include: {
                    grades: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Subjects retrieved successfully",
                data: subjects,
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

    async getSubjectByUuid(req: Request, res: Response): Promise<string | any> {
        try {
            const subject = await PrismaDb.subject.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
                include: {
                    grades: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Subject retrieved successfully",
                data: subject,
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

    async createSubject(req: Request, res: Response): Promise<string | any> {
        try {
            const acceptedFields = ["name", "classUuid", "teacherUuid"];

            if (missingValues(req, res, acceptedFields) !== true) {
                return;
            }

            // Check if class exists
            const classExists = await PrismaDb.class.findUnique({
                where: {
                    uuid: req.body.classUuid,
                },
            });

            if (!classExists) {
                return res.status(404).json({
                    success: false,
                    message: "Class not found",
                    data: [],
                });
            }

            // Check if teacher exists
            const teacherExists = await PrismaDb.teacher.findUnique({
                where: {
                    uuid: req.body.teacherUuid,
                },
            });

            if (!teacherExists) {
                return res.status(404).json({
                    success: false,
                    message: "Teacher not found",
                    data: [],
                });
            }

            const subjects = await PrismaDb.subject.create({
                data: {
                    name: req.body.name,
                    classUuid: req.body.classUuid,
                    teacherUuid: req.body.teacherUuid,
                },
                include: {
                    grades: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Subject created successfully",
                data: subjects,
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

    async updateSubject(req: Request, res: Response): Promise<string | any> {
        try {

            const subject = await PrismaDb.subject.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
            });

            if (!subject) {
                return res.status(404).json({
                    success: false,
                    message: "Subject not found",
                    data: [],
                });
            }

            const subjects = await PrismaDb.subject.update({
                where: {
                    uuid: req.params.uuid,
                },
                data: {
                    ...req.body,
                },
                include: {
                    grades: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Subject updated successfully",
                data: subjects,
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

    async deleteSubject(req: Request, res: Response): Promise<string | any> {
        try {

            const subject = await PrismaDb.subject.findUnique({
                where: {
                    uuid: req.params.uuid,
                },
            });

            if (!subject) {
                return res.status(404).json({
                    success: false,
                    message: "Subject not found",
                    data: [],
                });
            }

            await PrismaDb.subject.delete({
                where: {
                    uuid: req.params.uuid,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Subject deleted successfully",
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

export default SubjectsService;
