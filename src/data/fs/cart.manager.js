import fs from "fs";
import crypto from "crypto";
import productsManager from "./products.manager.js";


class CartManager {
    constructor(path){
        this.path = path
        this.exists()
    }

    exists = ()=>{
        const exist = fs.existsSync(this.path)

        if(!exist){
            fs.writeFileSync(this.path, JSON.stringify([]))
            console.log("file created")
        }else{
            console.log("file alredy exist")
        }
    }

    async read(cid){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const parseData  = JSON.parse(data)
                        
            if(cid){
                const filteredData = parseData.find((el) => el.id == cid)
                console.log(filteredData)
                return filteredData
            }else{
                return parseData
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async create (data){
        try {
            data.id = crypto.randomBytes(24).toString("hex")
            const all = await this.read();
            all.push(data)
            const stringAll = JSON.stringify(all, null, 2)
            await fs.promises.writeFile(this.path, stringAll)
            return data.id
        } catch (error) {
            console.error(error)
            throw error
        }
    }

  

    async addProduct(cid, pid){
        try {
            const all = await this.read()
            const cart = all.find((cart) => cart.id == cid)

            const product = await productsManager.read(pid)

            if (!product) {
                throw new Error(`Product with ID ${pid} not found`);
            }


            const productInCart = cart.products.find(item => item.id === pid);


            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                
                cart.products.push({ id: pid, quantity: 1 });
            }

            const stringAll = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, stringAll);

            return cart;

        } catch (error) {
            console.error(error)
            throw error
        }
    }

}

const cartManager = new CartManager("./src/data/memory/files/carts.json")
export default cartManager

