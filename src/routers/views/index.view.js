import { Router } from "express"
import { showAllProducts } from "../../controllers/products.controller.js"
import viewProductsRouter from "./products.view.js"
import viewUsersRouter from "./users.view.js"
import viewCartsRouter from "./cart.view.js"



const viewRouter = Router()

viewRouter.get("/", showAllProducts)
viewRouter.get("/:category?", showAllProducts)
viewRouter.use("/products", viewProductsRouter)
viewRouter.use("/users", viewUsersRouter)
viewRouter.use("/carts", viewCartsRouter)


export default viewRouter