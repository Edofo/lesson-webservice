import express, { Express, Request, Response } from "express";

import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";

import dbo from "./database/database";

import { UsersRouter, VideoGamesRouter } from "./modules/app";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

dbo.connectToServer((err: any) => {
    if (err) {
        console.log(err);
    }
});

// routes
app.use("/api/users", UsersRouter);
app.use("/api/videogames", VideoGamesRouter);

app.get("*", (req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        message: "404 Not Found",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
