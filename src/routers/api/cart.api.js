import { Router } from "express";
import { getCart, postAddProduct, postCreate } from "../../controllers/cart.controller.js";


const cartsRouter = Router()

cartsRouter.post("/", postCreate)
cartsRouter.get("/:cid", getCart)
cartsRouter.post("/:cid/product/:pid", postAddProduct)


// ver si hay que poner el middlewares

export default cartsRouter