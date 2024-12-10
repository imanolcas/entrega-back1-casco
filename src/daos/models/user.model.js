import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    password: {
        type: String,
        required: true
    },
    card: {
        
    },
    role: {
        type: String,
        default: true
    }
})

export const UserModel = model("users", UserSchema);