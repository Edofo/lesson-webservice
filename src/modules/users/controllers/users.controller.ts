import express, { Router } from "express";
import UsersService from "../services/users.service";

const UsersRouter: Router = express.Router();

UsersRouter.get("/", UsersService.getAllUsers);
// router.get("/:id", UsersService.getUserById);
// router.post("/", UsersService.createUser);
// router.put("/:id", UsersService.updateUser);
// router.delete("/:id", UsersService.deleteUser);

export default UsersRouter;
