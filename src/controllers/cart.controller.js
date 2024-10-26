
import cartManager from '../data/fs/cart.manager.js';
import cartsMongoManager from '../data/mongo/managers/cart.mongo.js';
import productsMongoManager from '../data/mongo/managers/product.mongo.js';


export async function readAll (req, res, next) {
    try {

        let response = await cartsMongoManager.readAll()
        
        if(response){
            return res.status(200).json({message: "carts read", response})
        }else{
            const error = new Error("Not found cart")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
} 

export async function getCart (req, res, next) {
    try {
        let { uid } = req.params

        let response
        response = await cartsMongoManager.read(uid)
        
        if(response){
            return res.status(200).json({message: "cart read", response})
        }else{
            const error = new Error("Not found cart")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
} 

export async function postCreate (req, res, next){
    try {
        const data = req.body

        const response = await cartsMongoManager.create(data)

        return res.status(201).json({message: "cart created", response: response})
    } catch (error) {
        return next(error);
    }
}

export async function postAddProduct(req, res, next){
    try {
        const { cid, pid } = req.params
        const response = await cartsMongoManager.addProduct(cid, pid)
        if (!response) {
            const error = new Error(`Product with id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({message: "cart update", response: response})
    } catch (error) {
        return next(error);
    }
}

export async function update(req, res, next) {
    try {
        const { pid } = req.params
        const newData = req.body
        const response = await cartsMongoManager.update(pid, newData)
        if (!response) {
            const error = new Error(`Product with id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({message: "Product update", response})
    } catch (error) {
        return next(error);
    }
}

export async function showCart (req, res, next) {
    try {
        let { uid } = req.params
        let response
        response = await cartsMongoManager.read(uid)

        const products = await Promise.all(
            response.products.map(async (item) => {
                return await productsMongoManager.read(item.product_id);
            })
        );
        
        const pack = {
            id: response.id,
            products: products
        }
        

        if(response){
            res.render("cart", {cart: pack})
            
        }else{
            const error = new Error("Not found cart")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
} 

export async function destroyCart (req, res, next){
    try {
        const { uid } = req.params
        const response = await cartsMongoManager.delete(uid)
        if (!response) {
            const error = new Error(`User with id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
        
        return res.redirect("/")
    } catch (error) {
        console.error(error)
        throw error
    }
}