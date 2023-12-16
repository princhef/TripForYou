import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { SearchContext } from "../../context/SearchContext";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reserve({setOpen,hotelId}){
    const {data,loading,error}=useFetch(`http://localhost:4000/api/hotels/room/${hotelId}`);
    const [selectedRooms,setSelectedRooms]=useState([]);

    const {date}=useContext(SearchContext); 
    //console.log(date);

    const getDatesInRange=(startDate,endDate)=>{
        const start=new Date(startDate);
        const end=new Date(endDate);
        const dat=new Date(start.getTime());
        let list=[];
        while(dat<=end){
            list.push(new Date(dat).getTime());
            dat.setDate(dat.getDate()+1);
        }
        return list;
    }

    const alldates=(getDatesInRange(date[0].startDate,date[0].endDate));
    
    const isAvailable=(roomNumber=>{
        const isFound=roomNumber.unavailableDates.some((dt)=> alldates.includes(new Date(dt).getTime()));
        return !isFound;
    })

    function handleSelect(e){
        const checked=e.target.checked;
        const value=e.target.value;
        setSelectedRooms(checked? [...selectedRooms,value]:selectedRooms.filter((item)=> item!==value
        ))

    }
    
    const navigate=useNavigate();

    const handleClick=async()=>{
        //console.log(alldates);
        try{
            await Promise.all(
                selectedRooms.map((roomId)=>{
                const res=axios.put(`http://localhost:4000/api/rooms/availability/${roomId}`,{dates:alldates});
                return res.data;
            })
            )
            setOpen(false);
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
    }
    //console.log(selectedRooms);
    return (
        <div className="reserve">
            <div className="rContainer">
            
            <IoIosCloseCircle className="rClose" onClick={()=>setOpen(false)}/>

            <span>Select your rooms</span>
            {
                data.map(item=>(
                    <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectRooms">
                    {
                        item.roomNumbers.map(roomNumber=>(
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect}
                                disabled={!isAvailable(roomNumber)}/>
                            </div>
                        ))
                    }
                    </div>
                    
                </div>
                )) 
            }
            <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}
export default Reserve;
