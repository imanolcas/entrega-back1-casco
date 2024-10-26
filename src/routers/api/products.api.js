import { Router } from "express";
import { getProduct, getAllProducts, destroyProduct, updateProduct, createGet,  } from "../../controllers/products.controller.js";


const productsRouter = Router()

productsRouter.get("/:category?", getAllProducts)
productsRouter.get("/:pid", getProduct)
productsRouter.post("/", createGet)
productsRouter.put("/:pid", updateProduct)
productsRouter.delete("/:pid", destroyProduct)



export default productsRouter