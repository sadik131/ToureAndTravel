import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl)
        console.log("connected db")
    } catch (error) {
        console.log(error)
    }
}