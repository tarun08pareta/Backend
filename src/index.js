// require('dotenv').config({path:'./env'})  // or different method

import dotenv from "dotenv";

import connectDB from "./db/index.js";

dotenv.config({
  path:'./env'
})

connectDB()
.then( () =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch( (err) => {
  console.log("MongoDB connection failled ! !")
})


/*

import mongoose from "mongoose";

import { DB_NAME } from "./constants";

 // mongo db connection 
import Express from "express";
const app = Express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("ERROR:", error);
            throw err;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listing on PORT ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("ERROR:", error);
        throw err;
    }
})();
 
*/