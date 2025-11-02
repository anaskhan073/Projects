import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "WINKU_PROJECT",
    }).then(()=>{
        console.log("Connected to Database");
    }).catch((error)=>{
        console.log(`Some error while connecting DataBase: ${error}`)
    });
}

