import { Router } from "express";
import { loginUser, registerUser, showUser, userController } from "../../controllers/users.controller.js";
import { checkAuthCookies, checkAuthHeaders } from "../../middleware/checkAuth.js";
import { passportCall } from "../../passport/passportCall.js";



const viewUsersRouter = Router()



// viewUsersRouter.get("/profile/:uid", showUser)
viewUsersRouter.get("/register", (req, res, next) =>{
    res.render("register")
 })
viewUsersRouter.post("/register",  userController.register)
viewUsersRouter.get("/login",  (req, res, next) =>{
    res.render("login")
 })
viewUsersRouter.post("/login", userController.login)

viewUsersRouter.get("/current", passportCall('current'), userController.privateData)





export default viewUsersRouter