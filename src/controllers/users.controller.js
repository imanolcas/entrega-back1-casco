import usersManager from '../data/fs/managers/user.manager.js';

export async function getAllUsers (req, res, next) {
    try {
        let { category } = req.query

        let response

        if(!category){
            response = await usersManager.readAll()
        }else{
            response = await usersManager.readAll(category)
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
        const response = await usersManager.read(uid)
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
        let { email, password } = req.body
        let { photo, role } = req.query
        if(!role){
            role = "none"
        }
        if(!photo){
            photo = []
        }

        email = email.toLowerCase()


        const response = await usersManager.create({
            photo,
            email,
            password,
            role
        })

        console.log(req)
        return res.status(201).json({message: "User created", response})
    } catch (error) {
        return next(error);
    }
}

export async function updateUser(req, res, next) {
    try {
        const { uid } = req.params
        const newData = req.body
        const response = await usersManager.update(uid, newData)
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
        console.log("uid: ", uid)
        const response = await usersManager.delete(uid)
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
