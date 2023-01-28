import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import missingValues from "../../../helpers/missingValues";
import PrismaDb from "../../../models/prisma";

const SubjectsService = {
    async getAllSubjects(req: Request, res: Response): Promise<string | any> {
        try {
            const Subjects = await PrismaDb.subject.findMany({
                include: {
                    grades: true,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Subjects retrieved successfully",
                data: Subjects,
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
            const Subjects = await PrismaDb.subject.findUnique({
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
                data: Subjects,
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

            const Subjects = await PrismaDb.subject.create({
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
                data: Subjects,
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
            const Subjects = await PrismaDb.subject.update({
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
                data: Subjects,
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
