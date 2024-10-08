import express from "express"
import router from "./src/routers/index.router.js"
import errorHandler from "./src/middleware/errorHandler.mid.js"
import pathHandler from "./src/middleware/pathHandler.mid.js"
import morgan from "morgan"
import {engine} from "express-handlebars"
import __dirname from "./utils.js"

try {
    const server = express()

    const port = 8080

    const ready = () => {
        console.log("server ready on port: " , port)
    }
    server.listen(port, ready)
    
    server.use(morgan("dev"))
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    
    server.use(router)
    server.use(errorHandler);
    server.use(pathHandler)
    server.engine("handlebars", engine())
    server.set("view engine", "handlebars" )
    server.set("views", __dirname + "/src/views");
    
    router.get('/', (req, res) => {
        const data = {
            title: 'Lista de Productos',
            productos: [
                { nombre: 'Producto 1', precio: 10 },
                { nombre: 'Producto 2', precio: 20 },
                { nombre: 'Producto 3', precio: 30 }
            ]
        };
        res.render('productos', data); // Renderiza la vista con los datos
    });
    
    

} catch (error) {
    console.log(error)
}


