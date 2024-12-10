import { Router } from "express";
import { getUser, getAllUsers, destroyUser, updateUser, createUser, userController  } from "../../controllers/users.controller.js";
import { checkAuthCookies, checkAuthHeaders } from "../../middleware/checkAuth.js";
import { passportCall } from "../../passport/passportCall.js";


const usersRouter = Router()

usersRouter.get("/", getAllUsers)
usersRouter.get("/:uid", getUser)
usersRouter.post("/", createUser)
usersRouter.put("/:uid", updateUser)
usersRouter.delete("/:uid", destroyUser)

usersRouter.post("/login", userController.login)
usersRouter.get("/private-cookies", [passportCall("current")], userController.privateData )

export default usersRouter