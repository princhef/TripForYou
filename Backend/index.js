import  express  from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import {createError} from "./utils/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

var MONGO="mongodb+srv://psdy01012000:fm4Ap0bLVEYvIrjC@cluster0.sfsnzds.mongodb.net/?retryWrites=true&w=majority"

const connect = async () =>{
    try {
        await mongoose.connect(MONGO);  
        console.log("connected");
      } catch (error) {
        throw error;
      }
};


const app=express();
 app.get("/",(req,res)=>{
    res.send("vdjvi");
 })

app.use(express.json());
app.use(cookieParser());
app.use(cors());
 
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500;
  const errorMessage=err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack: err.stack
  });
})
app.listen(4000,()=>{
    connect();
    console.log("hi");
})