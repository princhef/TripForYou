import { useContext } from "react"
import "./navbar.css"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

function Navbar(){
    const {user,dispatch}=useContext(AuthContext);
    const navigate=useNavigate();

    function handlelogout(){
        dispatch({type:"LOGOUT"});
        localStorage.removeItem(user);
        alert("You have been logged out successfully!");
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo" onClick={()=> navigate("/")} >TripForYou</span>
                {user? <div>{user.username} <button className="logout" onClick={handlelogout} > logout</button></div> 
                
                :  <div className="navItems">
                    <button className="navButton" onClick={()=> navigate("/register")}>Register</button>
                    <button className="navButton" onClick={()=> navigate("/login")} >Login</button>
                   </div>}
                
            </div>
        </div>
       
    )
}
export default Navbar