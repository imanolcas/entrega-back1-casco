import Product from "../models/product.model.js"


class ProductsMongoManager{
    async create(data){
        try {
            const one = await Product.create(data)
            return one
        } catch (error) {
            throw error            
        }
    }
    async readAll(category){
        try {
            if(category){
                const filteredData = await Product.find({category: category})
                return filteredData
            }else{
                const all = await Product.find()
                return all
            }
        } catch (error) {
            throw error            
        }
    }
    async read(pid){
        try {
            const one = await Product.findById(pid)
            return one
        } catch (error) {
            throw error            
        }
    }
    async update(pid, data){
        try {
            const opts = {new: true}
            const one = await Product.findByIdAndUpdate(pid, data, opts)
            return one
        } catch (error) {
            throw error            
        }
    }
    async delete(pid){
        try {
            const one = await Product.findByIdAndDelete(pid)
            return one
        } catch (error) {
            throw error            
        }    
    }
} 

const productsMongoManager = new ProductsMongoManager()
export default productsMongoManager