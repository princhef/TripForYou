import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register(){
    const [credentials,setCredentials]=useState(
        {
            username:"",
            email:"",
            password:""
        }
    );
    const handleChange=(e)=>{
        setCredentials((prev)=>({
            ...prev,[e.target.id]:e.target.value
        }))
    }
    const navigate=useNavigate();
    async function handleClick (){
        try{
            const res=await axios.post("http://localhost:4000/api/auth/register",credentials);
            console.log(res);
            alert("User created successfully");
            navigate("/login");
        }
        catch(err){
            //console.log(err);
            alert("Error! Username already exists!");
        }
    }

    return (
        <div className="regist">
            <div className="regContainer">
            <input type="text" placeholder="Username" id="username" onChange={handleChange}/>
            <input type="email" placeholder="Email" id="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" id="password" onChange={handleChange}/>
            <button onClick={handleClick} className="lButton">Register</button>
            </div>
        </div>
    )
}
export default Register;