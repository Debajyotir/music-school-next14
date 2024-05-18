import mongoose from "mongoose";

export const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!,{dbName: "auth-in-nextjs"});

        const connection = mongoose.connection;

        connection.on("connected",()=>{
            console.log("MongoDB Connected");
        })

        connection.on("error",(error)=>{
            console.log("MongoDB connection error, please make sure db is up and running: " + error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong inconnecting to db");
        console.log(error);
    }
}