import { model, Schema } from "mongoose";


const collection = "product"

const schema = new Schema({
    title: { type: String, required: true},
    description: { type: String },
    code: { type: String },
    price: { type: Number, required: true},
    status: { type: Boolean},
    stock: { type: Number},
    category: { type: String, default: "none" },
    thumbnail: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaCYt_Skg_DdS56k7TJ6K6bjyh2l-8W_3_WA&s" },
})

const Product = model(collection, schema) 

export default Product