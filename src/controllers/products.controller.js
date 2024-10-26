import mongoose from 'mongoose';
import productsManager from '../data/fs/products.manager.js';
import productsMongoManager from '../data/mongo/managers/product.mongo.js';

export async function getAllProducts (req, res, next) {
    try {
        // let { category } = req.query

        let response

        response = await productsMongoManager.readAll()
        // if(!category){
        // }else{
        //     response = await productsMongoManager.readAll(category)
        // }
        return res.status(200).json({message: "Products read", response: response})
        // if(response.length > 0){
        // }else{
        //     const error = new Error("Not found products")
        //     error.statusCode = 404
        //     throw error
        // }
    } catch (error) {
        return next(error);
    }
} 

export async function getProduct(req, res, next) {
    try {
        const { pid } = req.params
        const response = await productsMongoManager.read(pid)
        if(response){
            res.status(200).json({message: "Product read", response})
        }else{
            const error = new Error("Not found product")
            error.statusCode(404)
            throw error
        }
    } catch (error) {
        return next(error);
    }
}

export async function createGet (req, res, next){
    try {
        const { data } = req.body

        const response = await productsMongoManager.create(data)

        return res.status(201).json({message: "Product created", response: response._id})
    } catch (error) {
        return next(error);
    }
}

export async function updateProduct(req, res, next) {
    try {
        const { pid } = req.params
        const newData = req.body
        const response = await productsMongoManager.update(pid, newData)
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

export async function destroyProduct(req, res, next) {
    try {
        const { pid } = req.params
        const response = await productsMongoManager.delete(pid)
        if (!response) {
            const error = new Error(`Product with id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({message: "Product delete", response: response})
    } catch (error) {
        return next(error);
    }
}

export async function showAllProducts (req, res, next) {
    try {
        let { category } = req.query

        let products

        if(!category){
            products = await productsMongoManager.readAll()
        }else{
            products = await productsMongoManager.readAll(category)
        }

        return res.render("index", {products: products})

    } catch (error) {
        return next(error);
    }
} 


export async function showProduct(req, res, next) {
    try {
        const { pid } = req.params
        const objectId = new mongoose.Types.ObjectId(pid);
        const product = await productsMongoManager.read(objectId)
        
        
        if(product){
            return res.render("productDetail", {product: product})
        }else{
            const error = new Error("Not found product")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
}

export async function adminProducts (req, res, next) {
    try {
        let { category } = req.query

        let products

        if(!category){
            products = await productsMongoManager.readAll()
        }else{
            products = await productsMongoManager.readAll(category)
        }

        return res.render("admin", {products: products})

    } catch (error) {
        return next(error);
    }
} 

export async function createProduct (req, res, next){
    try {
        // const { title, description, code, price, status, stock } = req.body
        // let { category, thumbnails } = req.query
        // if(!category){
        //     category = "none"
        // }
        // if(!thumbnails){
        //     thumbnails = []
        // }


        // const response = await productsManager.create({
        //     title,
        //     description,
        //     code,
        //     price,
        //     status,
        //     stock,
        //     category,
        //     thumbnails
        // })
      
        const data  = req.body
    
        const response = await productsMongoManager.create(data)

        return res.redirect("/products/admin")
    } catch (error) {
        return next(error);
    }
}


export async function editProduct(req, res, next) {
    try {
        const { pid } = req.params
        const newData = req.body
        const response = await productsMongoManager.update(pid, newData)
        if (!response) {
            const error = new Error(`Product with id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.redirect("/products/admin")
    } catch (error) {
        return next(error);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const { pid } = req.params
        const response = await productsMongoManager.delete(pid)
        if (!response) {
            const error = new Error(`Product with id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.redirect("/products/admin")
    } catch (error) {
        return next(error);
    }
}
