import "./header.css";
import { FaBed } from 'react-icons/fa';
import { MdFlight } from 'react-icons/md';
import { AiFillCar } from 'react-icons/ai';
import { MdAttractions } from 'react-icons/md';
import { BsTaxiFrontFill,BsFillPersonFill } from 'react-icons/bs';
import {AiOutlineCalendar} from "react-icons/ai";
import {DateRange} from "react-date-range";
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.js"
import { AuthContext } from "../../context/AuthContext.js";

function Header(props){
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      var tmp=date[0].startDate;
      var tmp2=date[0].endDate;

    const [openDate,setopenDate]=useState(false);
    const [openOptions,setopenOptions]=useState(false);
    const[destination,setdestination]=useState("");

    const [options,setOptions]=useState({
        adult:1,
        children:0,
        room:1
    });

    function handleOption(name,operation){
        setOptions((prev)=>{
            return {
                ...prev,[name]:operation==="i"?options[name]+1:options[name]-1
            }
        })
    }

    const navigate=useNavigate();
    const {user}=useContext(AuthContext);
    const {dispatch}=useContext(SearchContext);
    
    function handleSearch(){
        //console.log(date);
        dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
        navigate("/hotels",{state:{destination,date,options}});
    }
    return (
        <div className="header">
            <div className={props.type==="list"?"headerContainer listMode":"headerContainer"}>
            
            <div className="headerList">
                <div className="headerListItem active">
                    <FaBed/><span>Stays</span>
                </div>
                <div className="headerListItem">
                    <MdFlight/><span>Flights</span>
                </div>
                <div className="headerListItem">
                    <AiFillCar/><span>Car Rentals</span>
                </div>
                <div className="headerListItem">
                    <MdAttractions/><span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <BsTaxiFrontFill/><span>Airport Taxis</span>
                </div>
            </div>
            
            {props.type!=="list" && 

            <><h1 className="headerTitle">Get Your Stays at Cheapest Prices</h1>
            <p className="headerDesc">Welcome to TripForYou.Find your dream places at lowest prices with zero additional charges and instant cancellation.</p>
            
            {!user && <button className="headerBtn" onClick={()=> navigate("/register")}>Sign in/Register</button>}

            <div className="headerSearch">

                <div className="headerSearchItem">
                <FaBed className="headerIcon"/>
                <input type="text" placeholder="Where to go" className="headerSearchInput" onChange={e=>setdestination(e.target.value)}/>
                </div>

                <div className="headerSearchItem">
                <AiOutlineCalendar className="headerIcon"/>
                <span onClick={()=>{setopenDate(!openDate)}} className="headerSearchText">{tmp.getFullYear() + "-" + (tmp.getMonth()+1) + "-" + tmp.getDate()} to {tmp2.getFullYear() + "-" + (tmp2.getMonth()+1) + "-" + tmp2.getDate()}</span>
                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date"
                />}
                </div>

                <div className="headerSearchItem">
                <BsFillPersonFill className="headerIcon"/>
                <span onClick={()=>setopenOptions(!openOptions)} className="headerSearchText">{options.adult+" adult . "+options.children+" children . "+options.room+" room"}</span>
                {openOptions && <div  className="options">
                    <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                        <button disabled={options.adult<=1} onClick={()=>handleOption("adult","d")} className="optionCounterButton">-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button onClick={()=>handleOption("adult","i")} className="optionCounterButton">+</button>
                    </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div  className="optionCounter">
                        <button disabled={options.children<=0} onClick={()=>handleOption("children","d")} className="optionCounterButton">-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button onClick={()=>handleOption("children","i")} className="optionCounterButton">+</button>
                    </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                        <button disabled={options.room<=1} onClick={()=>handleOption("room","d")} className="optionCounterButton">-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button onClick={()=>handleOption("room","i")} className="optionCounterButton">+</button>
                    </div>
                    </div>
                </div>}
                
                </div>
                
                <div className="headerSearchItem">
                    <button onClick={handleSearch} className="headerBtn">Search</button>
                </div>

            </div></>}

            </div>
        </div>
    )
}
export default Header;