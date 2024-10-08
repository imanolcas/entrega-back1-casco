import productsManager from '../data/fs/managers/products.manager.js';

export async function getAllProducts (req, res, next) {
    try {
        let { category } = req.query

        let response

        if(!category){
            response = await productsManager.readAll()
        }else{
            response = await productsManager.readAll(category)
        }
        if(response.length > 0){
            return res.status(200).json({message: "Products read", response: response})
        }else{
            const error = new Error("Not found products")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
} 

export async function getProduct(req, res, next) {
    try {
        const { pid } = req.params
        const response = await productsManager.read(pid)
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
        const { title, description, code, price, status, stock } = req.body
        let { category, thumbnails } = req.query
        if(!category){
            category = "none"
        }
        if(!thumbnails){
            thumbnails = []
        }


        const response = await productsManager.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })

        return res.status(201).json({message: "Product created", response})
    } catch (error) {
        return next(error);
    }
}

export async function updateProduct(req, res, next) {
    try {
        const { pid } = req.params
        const newData = req.body
        const response = await productsManager.update(pid, newData)
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
        const response = await productsManager.delete(pid)
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
            products = await productsManager.readAll()
        }else{
            products = await productsManager.readAll(category)
        }
        if(products.length > 0){
            return res.render("index", {products: products})
        }else{
            const error = new Error("Not found products")
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
            products = await productsManager.readAll()
        }else{
            products = await productsManager.readAll(category)
        }
        if(products.length > 0){
            return res.render("admin", {products: products})
        }else{
            const error = new Error("Not found products")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
} 

export async function createProduct (req, res, next){
    try {
        const { title, description, code, price, status, stock } = req.body
        let { category, thumbnails } = req.query
        if(!category){
            category = "none"
        }
        if(!thumbnails){
            thumbnails = []
        }


        const response = await productsManager.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })

        return res.redirect("/products/admin")
    } catch (error) {
        return next(error);
    }
}


export async function editProduct(req, res, next) {
    try {
        const { pid } = req.params
        const newData = req.body
        console.log(pid)
        const response = await productsManager.update(pid, newData)
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
        const response = await productsManager.delete(pid)
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
