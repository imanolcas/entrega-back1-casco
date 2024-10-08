import { Router } from "express"
import { showAllProducts } from "../../controllers/products.controller.js"
import viewProductsRouter from "./products.view.js"
import viewUsersRouter from "./users.view.js"



const viewRouter = Router()


viewRouter.get("/", showAllProducts)
viewRouter.use("/products", viewProductsRouter)
viewRouter.use("/users", viewUsersRouter)


export default viewRouter