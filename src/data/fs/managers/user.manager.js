import fs from "fs";
import crypto from "crypto";

class UsersManager {
    constructor(path){
        this.path = path
        this.exists()
    }

    exists = ()=>{
        const exist = fs.existsSync(this.path);

        if(!exist){
            fs.writeFileSync(this.path, JSON.stringify([]))
            console.log("file created")
        }else{
            console.log("file alredy exist")
        }
    }

    async readAll (category){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const parseData  = JSON.parse(data)
            if(category){
                const filteredData = parseData.filter((el) => el.category === category)
                return filteredData
            }else{
                return parseData
            }
        } catch (error) {
            console.error(error)
            throw error
            
        }
    }

    async read (id){
        try {
            const all = await this.readAll()
            const one = all.find(product => product.id === id)
            return one
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async create(data) {
        try {
            console.log(data)
          data.id = crypto.randomBytes(12).toString("hex");

          const all = await this.readAll();
          
          all.push(data);
          const stringAll = JSON.stringify(all, null, 2);
          await fs.promises.writeFile(this.path, stringAll);
          return data.id;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

    async update (id, newData){
        try {
            const all = await this.readAll()
            const index = all.findIndex((product) => product.id === id)
            if(index == -1){
                return null
            }
            all[index] = {...all[index], ...newData}
            const stringAll = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, stringAll);
            return all[index];
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async delete (id){
        try {
            const all = await this.readAll()
            const filteredUsers = all.filter((product) => product.id !== id)
            if (all.length === filteredUsers.length) {
                return null
            }
            const stringAll = JSON.stringify(filteredUsers, null, 2);
            await fs.promises.writeFile(this.path, stringAll);
            return `Product with id: ${id} delete`

        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

const usersManager = new UsersManager("./src/data/memory/files/users.json")
export default usersManager