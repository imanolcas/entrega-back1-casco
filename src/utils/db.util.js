import mongoose, { connect } from "mongoose";



async function dbConnect(){
    try{
        await mongoose.connect(process.env.DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default dbConnect
// try {
//    await connect(process.env.DB_LINK)
//    console.log("Mongo DB connected")
// } catch (error) {
//     console.log(error)
// }