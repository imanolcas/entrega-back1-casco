import { Router } from "express";
import { getCart, postAddProduct, postCreate, readAll } from "../../controllers/cart.controller.js";


const cartsRouter = Router()

cartsRouter.post("/", postCreate)
cartsRouter.get("/:uid", getCart)
cartsRouter.post("/:cid/product/:pid", postAddProduct)
cartsRouter.get("/", readAll)



export default cartsRouter