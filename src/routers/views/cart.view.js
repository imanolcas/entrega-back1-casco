import { Router } from "express";
import { destroyCart, showCart } from "../../controllers/cart.controller.js";


const viewCartsRouter = Router()



viewCartsRouter.get("/:uid", showCart)
viewCartsRouter.post("/delete/:cid", destroyCart)




export default viewCartsRouter