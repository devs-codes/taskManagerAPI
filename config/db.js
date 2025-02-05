const mongoose = require("mongoose")

exports.dbConnection = async ()=>{
    try {
        const connectDb = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
    }
}