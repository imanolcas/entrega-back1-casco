
import cartManager from './../data/cart.manager.js';

export async function getCart (req, res, next) {
    try {
        let { cid } = req.params

        let response
        response = await cartManager.read(cid)
        
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
        const { id } = req

        const response = await cartManager.create({
            products: []
        })
        return res.status(201).json({message: "cart created", response: response})
    } catch (error) {
        return next(error);
    }
}

export async function postAddProduct(req, res, next){
    try {
        const { cid, pid } = req.params
        const response = await cartManager.addProduct(cid, pid)
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

