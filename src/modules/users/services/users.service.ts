import { Request, Response } from "express";

const UsersService = {
    async getAllUsers(req: Request, res: Response): Promise<string | any> {
        try {
            res.status(200).send("getAllUsers");
        } catch (error: any) {
            throw error;
        }
    },
};

export default UsersService;
