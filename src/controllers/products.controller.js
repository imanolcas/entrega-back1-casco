import productsManager from './../data/products.manager.js';

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
        console.log("pid: ", pid)
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
