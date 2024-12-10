// import mongoose from 'mongoose';
// import usersManager from '../data/fs/user.manager.js';
// import usersMongoManager from '../data/mongo/managers/user.mongo.js';
import controllers from './controller.manager.js';
import { userService } from '../services/user.services.js';

class UserController extends controllers{
    constructor(){
        super(userService)
    }

    register = async(req, res, next) => {
        try {
            const user = await this.service.register(req.body)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {
        try {
            const token = await this.service.login(req.body)
            res
                .cookie("token", token, {httpOnly: true})
                .json({ message: "login", token})
        } catch (error) {
            next(error)
        }
    }

    privateData = (req, res, next) => {
        try {
            if(!req.user)
                throw new Error("Unable to access user data");
            res.json({
                user: req.user
            })
            
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController()






// Anterior

export async function getAllUsers (req, res, next) {
    try {
        let { category } = req.query

        let response

        if(!category){
            response = await usersMongoManager.readAll()
        }else{
            response = await usersMongoManager.readAll(category)
        }
        if(response.length > 0){
            return res.status(200).json({message: "users read", response: response})
        }else{
            const error = new Error("Not found users")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
} 


export async function getUser(req, res, next) {
    try {
        const { uid } = req.params
        const objectId = new mongoose.Types.ObjectId(uid);
        const response = await usersMongoManager.read(objectId)
        if(response){
            res.status(200).json({message: "User read", response})
        }else{
            const error = new Error("Not found user")
            error.statusCode(404)
            throw error
        }
    } catch (error) {
        return next(error);
    }
}

export async function createUser (req, res, next){
    try {
        let data = req.body

        data.email = data.email.toLowerCase()


        const response = await usersManager.create()

        
        return res.status(201).json({message: "User created", response})
    } catch (error) {
        return next(error);
    }
}

export async function updateUser(req, res, next) {
    try {
        const { uid } = req.params
        const newData = req.body
        const response = await usersMongoManager.update(uid, newData)
        if (!response) {
            const error = new Error(`User with id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({message: "User update", response})
    } catch (error) {
        return next(error);
    }
}

export async function destroyUser(req, res, next) {
    try {
        const { uid } = req.params
        const response = await usersMongoManager.delete(uid)
        if (!response) {
            const error = new Error(`User with id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({message: "User delete", response: response})
    } catch (error) {
        return next(error);
    }
}


export async function showUser(req, res, next) {
        try {
            const { id } = req.params
            const objectId = new mongoose.Types.ObjectId(id);
            const response = await usersMongoManager.read(objectId)
            if(response){
                res.render("user", {user: response})
            }else{
                const error = new Error("Not found user")
                error.statusCode(404)
                throw error
            }
        } catch (error) {
            return next(error);
        }
}


export async function registerUser (req, res, next){
    try {
        let data = req.body
        
        data.email = data.email.toLowerCase()

        await usersMongoManager.create(data)

        return res.redirect('/');
    } catch (error) {
        return next(error);
    }
}


export async function loginUser (req, res, next){
    try {

        let {email, password} = req.body
        const response = await usersMongoManager.verify(email, password)
        
        if(response){
            return res.redirect("/");
        }else{
            res.render("login")
        }
    } catch (error) {
        return next(error);
    }
}