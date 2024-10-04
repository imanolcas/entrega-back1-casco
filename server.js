import express from "express"
import router from "./src/routers/index.router.js"
import errorHandler from "./src/middleware/errorHandler.mid.js"
import pathHandler from "./src/middleware/pathHandler.mid.js"

try {
    const server = express()

    const port = 8080

    const ready = () => {
        console.log("server ready on port: " , port)
    }
    server.listen(port, ready)
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    
    server.use(router)
    server.use(errorHandler);
    server.use(pathHandler)

    //falta morgan

} catch (error) {
    console.log(error)
}


