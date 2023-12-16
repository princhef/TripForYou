import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { GoLocation } from 'react-icons/go';
import img1 from "../../images/img1.jpg";
import { useState } from "react"
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"
import {AiFillCloseCircle} from "react-icons/ai"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch.js"
import { SearchContext } from "../../context/SearchContext.js"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.js";
import Reserve from "../../components/reserve/Reserve.jsx"

function Hotel(){

    const location=useLocation();
    const id=location.pathname.split("/")[2];
    const {data,loading,error}=useFetch(`http://localhost:4000/api/hotels/find/${id}`);
    
    const {date}=useContext(SearchContext);
    //console.log(date);
    
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();

    const [openModal,setOpenModal]=useState(false);
    
    const [slideNumber,setSlideNumber]=useState(0);
    const [open,setOpen]=useState(false);
    const photos=data.photos;
    function handleOpen(i){
        setSlideNumber(i);
        setOpen(true);
    }
    function handleMove(direction){
        let newSlideNumber;
        if(direction==="l"){
            newSlideNumber= slideNumber===0 ? photos.length-1 : slideNumber-1;
        }
        else{
            newSlideNumber=slideNumber===photos.length-1 ? 0 : slideNumber+1;
        }
        setSlideNumber(newSlideNumber);
    }

    function handleClick(){
        if(user){
            setOpenModal(true);
        }
        else{
            navigate("/login");
        }
    }
    /*console.log(data);
    data.length && data.photos.map((photo,i)=>{
        console.log(photo);
    })*/
    
    return (
        
        <div>
            <Navbar/>
            <Header type="list"/>
            <div className="hotelContainer">
                {open && <div className="slider">
                    <BsFillArrowLeftCircleFill className="arrow" onClick={()=>handleMove("l")}/>
                    
                    <div className="sliderWrapper">
                        <img src={photos[slideNumber]} alt="" className="sliderImg"/>
                    </div>
                    <BsFillArrowRightCircleFill className="arrow" onClick={()=>handleMove("r")}/>
                    <AiFillCloseCircle className="close" onClick={()=>setOpen(false)}/>
                </div> 
                
                }
                
                <div className="hotelWrapper">
                    <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
                    <div className="hotelTitle">{data.name}</div>
                    <div className="hotelAddress">
                        <GoLocation/>
                        <span> {data.address}</span>
                    </div>
                    <span className="hotelDistance">Excellent location-{data.distance}m from center</span>
                    <span className="hotelPriceHighlight">Book a stay over ₹{data.cheapestPrice} at this property</span>
                    <div className="hotelImages">
                    {photos && photos.length && photos.map((photo,i)=>(
                            <div className="hotelImgWrapper">
                                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
                                
                            </div>
                    ))
                    }
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">{data.desc}</p>
                             
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for your stay</h1>
                            <span>Highly rated by guests </span>
                            <h2><b> ₹{data.cheapestPrice}</b><small> per night</small></h2>
                            <button onClick={handleClick}>Reserve or Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <MailList/>
            <Footer/>
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
        </div>
    )
}
export default Hotel;