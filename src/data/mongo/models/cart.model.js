import { model, Schema, Types } from "mongoose";


const collection = "carts"

const schema = new Schema({
    user_id: { type: Types.ObjectId, ref:"user" , required: true },
    products: [
        {
            product_id: { type: Types.ObjectId, ref:"products", required: true},
            quantity:{ type: Number, required: true }
        }
    ],
    state: { type: String, enum:["reserved", "paid", "delivered"], default: "reserved"},
})
const Cart = model(collection, schema)

export default Cart