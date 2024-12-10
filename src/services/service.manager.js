
export default class Service{
    constructor(dao){
        this.dao = dao
    }

    async getAll(){
        try {
            const response = await this.dao.getAll()
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    async getById(id){
        try {
            const response = await this.dao.getById(id)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    async create(obj){
        try {
            const response = await this.dao.create(obj)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    async update(id, obj){
        try {
            const response = await this.dao.update(id, obj)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }
}