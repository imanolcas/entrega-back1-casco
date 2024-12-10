import { isValidPassword, createHash } from "../../utils.js";
import { userDao } from "../daos/mongoDB/user.dao.js";
import Service from "./service.manager.js";
import jwt from "jsonwebtoken"

class UserService extends Service{
    constructor(){
        super(userDao)
    }

    generateToken = (user) => {
        const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            role: user.role
        }

        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "30m"})
    }

    getUserByEmail = async (email) => {
        try{
            return await this.dao.getByEmail(email)
        }catch(error){
            throw new Error(error);
        }
    }
    

    register = async (user) =>{
        try {
            const {email, password} = user
            const existUser = await this.getUserByEmail(email)
            if(existUser) throw new Error("User already exist");
            const newUser = await this.dao.register({
                ...user,
                password: createHash(password)
            })
            return newUser
        } catch (error) {
            throw error
        }
    }

    login = async (user) => {
        try {
            const { email, password } = user
            const userExist = await this.getUserByEmail(email)
            if (!userExist) throw new Error("User not found")
            const passwordValid = isValidPassword(password, userExist)
            if(!passwordValid) throw new Error("incorrect password")
            return this.generateToken(userExist)
        } catch (error) {
            throw error
        }
    }
}


export const userService = new UserService()