import { Router } from "express";
import productsRouter from "./products.api.js";
import cartsRouter from "./cart.api.js";
import usersRouter from "./users.api.js";
const apiRouter = Router()

apiRouter.use("/products", productsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/carts", cartsRouter)

export default apiRouter