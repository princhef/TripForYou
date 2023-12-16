import React from "react";
import "./login.css";
import { useState } from "react";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext.js"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [credentials,setCredentials]=useState(
        {
            username:"",
            password:""
        }
    );
    
    const {loading,error,dispatch}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setCredentials((prev)=>({
            ...prev,[e.target.id]:e.target.value
        }))
    }
  
    const handleClick=async e=>{
        
        console.log(credentials);
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try{
            const res=await axios.post("http://localhost:4000/api/auth/login",credentials);
            console.log(res);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/");
        }
        catch(err){
            console.log(err);
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    }
    

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"/>
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput"/>
                <button onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}
export default Login
