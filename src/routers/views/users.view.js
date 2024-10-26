import { Router } from "express";
import { loginUser, registerUser, showUser } from "../../controllers/users.controller.js";



const viewUsersRouter = Router()



viewUsersRouter.get("/profile/:uid", showUser)
viewUsersRouter.get("/register", (req, res, next) =>{
   res.render("register")
})
viewUsersRouter.post("/register", registerUser)
viewUsersRouter.get("/login",  (req, res, next) =>{
    res.render("login")
 })
viewUsersRouter.post("/login", loginUser)





export default viewUsersRouter