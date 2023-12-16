import React from "react";
import "./list.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import SearchItem from "../../components/SearchItem/SearchItem.jsx"
import {  useLocation } from "react-router-dom";
import {useState} from "react";
import { DateRange } from "react-date-range";
import useFetch from "../../hooks/useFetch.js"

function List(){
    const location=useLocation();
    //console.log(location);
    const[dest,setdest]=useState(location.state.destination);
    const[date,setdate]=useState(location.state.date);
    const[options,setoptions]=useState(location.state.options);
    const[min,setMin]=useState(undefined);
    const[max,setMax]=useState(undefined);
    
    var tmp=date[0].startDate;
    var tmp2=date[0].endDate;

    const [openDate,setopenDate]=useState(false);

    const {data,loading,error,reFetch}=useFetch(`http://localhost:4000/api/hotels?city=${dest}&min=${min || 0}&max=${max || 49999}`)

    function handleClick(){
        reFetch();
    }

    return (
        <div><Navbar/>
        <Header type="list"/>
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                <h1 className="listTitle">Search</h1>
                <div className="lsItem">
                    <label>Destination</label>
                    <input placeholder={dest} onChange={e=>setdest(e.target.value)} type="text"/>
                </div>
                <div className="lsItem">
                     <label>Check-in Date</label>
                     <span onClick={()=>setopenDate(!openDate)}>
                     {tmp.getFullYear() + "-" + (tmp.getMonth()+1) + "-" + tmp.getDate()} to {tmp2.getFullYear() + "-" + (tmp2.getMonth()+1) + "-" + tmp2.getDate()}
                     </span>

                     {openDate && <DateRange
                     onChange={(item)=>setdate([item.selection])}
                     minDate={new Date()}
                     ranges={date}
                     />}
                </div>
                
                <div className="lsItem">
                    <label>Options</label>
                    <div className="lsOption">
                    <div className="lsOptionItem">
                        <span className="lsItemText">
                            Min Price <small> per night</small>
                        </span>
                        <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput"/>
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsItemText">
                            Max Price <small> per night</small>
                        </span>
                        <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput"/>
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsItemText">
                            Adult 
                        </span>
                        <input type="number" min={1} className="lsOptionInput" placeholder={options.adult}/>
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsItemText">
                            Children
                        </span>
                        <input type="number" min={0} className="lsOptionInput" placeholder={options.children}/>
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsItemText">
                            Room
                        </span>
                        <input type="number" min={1} className="lsOptionInput" placeholder={options.room}/>
                    </div>

                </div>
                </div>
                <button onClick={handleClick}>Search</button>
                </div>

                <div className="listResult">
                    {data.map(item=>(
                        <SearchItem item={item} key={item._id}/>
                    ))}
                </div>

            </div>
        </div>
        </div>

    )
}
export default List;