import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import dbo from "../../../database/database";

const VideoGamesService = {
    async getAllVideoGames(req: Request, res: Response): Promise<{} | any> {
        try {
            const dbConnection = dbo.getDb();

            const videoGames = await dbConnection.collection("videogames").find({}).toArray();

            return res.status(200).json({
                success: true,
                message: "Video games retrieved successfully",
                data: videoGames,
            });
        } catch (error: any) {
            throw error;
        }
    },

    async getVideoGameById(req: Request, res: Response): Promise<{} | any> {
        try {
            const dbConnection = dbo.getDb();

            const videoGame = await dbConnection.collection("videogames").findOne({ _id: new ObjectId(req.params.id) });

            return res.status(200).json({
                success: true,
                message: "Video game retrieved successfully",
                data: videoGame,
            });
        } catch (error: any) {
            throw error;
        }
    },

    async createVideoGame(req: Request, res: Response): Promise<{} | any> {
        try {
            const dbConnection = dbo.getDb();

            const videoGame = await dbConnection.collection("videogames").insertOne(req.body);

            return res.status(201).json({
                success: true,
                message: "Video game created successfully",
                data: videoGame,
            });
        } catch (error: any) {
            throw error;
        }
    },

    async updateVideoGame(req: Request, res: Response): Promise<{} | any> {
        try {
            const dbConnection = dbo.getDb();

            const videoGame = await dbConnection
                .collection("videogames")
                .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

            return res.status(200).json({
                success: true,
                message: "Video game updated successfully",
                data: videoGame,
            });
        } catch (error: any) {
            throw error;
        }
    },

    async deleteVideoGame(req: Request, res: Response): Promise<{} | any> {
        try {
            const dbConnection = dbo.getDb();

            const videoGame = await dbConnection
                .collection("videogames")
                .deleteOne({ _id: new ObjectId(req.params.id) });

            return res.status(200).json({
                success: true,
                message: "Video game deleted successfully",
                data: videoGame,
            });
        } catch (error: any) {
            throw error;
        }
    },
};

export default VideoGamesService;
