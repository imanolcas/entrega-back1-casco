import express from "express"
import router from "./src/routers/index.router.js"

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

} catch (error) {
    console.log(error)
}


