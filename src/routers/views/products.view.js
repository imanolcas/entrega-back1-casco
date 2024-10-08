import { Router } from "express";
import { adminProducts, deleteProduct, editProduct, createProduct} from "../../controllers/products.controller.js";


const viewProductsRouter = Router()

viewProductsRouter.get("/admin", adminProducts)
viewProductsRouter.post("/delete/:pid", deleteProduct)
viewProductsRouter.post("/edit/:pid", editProduct)
viewProductsRouter.post("/create", createProduct)



export default viewProductsRouter