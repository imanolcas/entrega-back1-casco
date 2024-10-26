import { model, Schema } from "mongoose";


const collection = "users"

const schema = new Schema({
    photo: { type: String, default: "https://www.google.com/imgres?q=user&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F005%2F129%2F844%2Fsmall_2x%2Fprofile-user-icon-isolated-on-white-background-eps10-free-vector.jpg&imgrefurl=https%3A%2F%2Fes.vecteezy.com%2Fvectores-gratis%2Fuser-icon&docid=JI6jU1nthoRZtM&tbnid=xG8Q4QsZ94cpEM&vet=12ahUKEwjeitPCoKqJAxVCHrkGHUCELyQQM3oECF0QAA..i&w=400&h=400&hcb=2&ved=2ahUKEwjeitPCoKqJAxVCHrkGHUCELyQQM3oECF0QAA" },
    email: { type: String, required: true},
    password:{ type: String, required: true },
    role: { type: String, default: "none"},
})


const User = model(collection, schema)

export default User