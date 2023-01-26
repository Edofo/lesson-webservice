import express, { Router } from "express";
import VideoGamesService from "../services/videogames.service";

const VideoGamesRouter: Router = express.Router();

VideoGamesRouter.get("/", VideoGamesService.getAllVideoGames);
VideoGamesRouter.get("/:id", VideoGamesService.getVideoGameById);
VideoGamesRouter.post("/", VideoGamesService.createVideoGame);
VideoGamesRouter.put("/:id", VideoGamesService.updateVideoGame);
VideoGamesRouter.delete("/:id", VideoGamesService.deleteVideoGame);

export default VideoGamesRouter;
