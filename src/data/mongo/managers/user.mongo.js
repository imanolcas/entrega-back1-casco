import User from "../models/user.model.js"

class UsersMongoManager{
    async create(data){
        try {
            const one = await User.create(data)
            return one
        } catch (error) {
            throw error            
        }
    }
    async readAll(){
        try {
            const all = await User.find()
            return all
        } catch (error) {
            throw error            
        }
    }
    async read(uid){
        try {
            const one = await User.findById(uid)
            return one
        } catch (error) {
            throw error            
        }
    }
    async update(uid, data){
        try {
            const opts = {new: true}
            const one = await User.findByIdAndUpdate(uid, data, opts)
            return one
        } catch (error) {
            throw error            
        }
    }
    async delete(uid){
        try {
            const one = await User.findByIdAndDelete(uid)
            return one
        } catch (error) {
            throw error            
        }    
    }
    async verify(email, password){
        try {
            const one = await User.findOne({email: email})
            if(one.password === password){
                return true
            }
            return false
        } catch (error) {
            throw error            
        }  
    }
} 


const usersMongoManager = new UsersMongoManager()
export default usersMongoManager