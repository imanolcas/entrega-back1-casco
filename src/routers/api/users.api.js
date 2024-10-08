import { Router } from "express";
import { getUser, getAllUsers, destroyUser, updateUser, createUser  } from "../../controllers/users.controller.js";


const usersRouter = Router()

usersRouter.get("/", getAllUsers)
usersRouter.get("/:uid", getUser)
usersRouter.post("/", createUser)
usersRouter.put("/:uid", updateUser)
usersRouter.delete("/:uid", destroyUser)


export default usersRouter