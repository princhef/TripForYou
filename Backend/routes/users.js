import express from "express";
import {updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js"
import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
const router=express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("User logged in");
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("User logged in, you can delete account");
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("Admin logged in, you can delete all account");
})

//update
router.put("/:id",verifyUser, updateUser);
//delete
router.delete("/:id",verifyUser, deleteUser);
//get
router.get("/:id",verifyUser, getUser);
//get all
router.get("/",verifyAdmin, getUsers)

export default router;