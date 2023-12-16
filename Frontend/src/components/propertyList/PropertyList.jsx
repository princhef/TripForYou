import "./propertyList.css"
import imgs from "../../images/img1.jpg"
import hot from "../../images/home_hotel.jpg";
import apart from "../../images/home_apartment.jpg";
import resort from "../../images/home_resort.jpeg";
import villa from "../../images/home_villa.jpg";
import cabin from "../../images/home_cabin.jpg";
import useFetch from "../../hooks/useFetch";
function PropertyList(){
    const {data,loading,error}=useFetch("http://localhost:4000/api/hotels/countByType");

    return (
        <div className="pList">
        {data.length>0 && 
        <>
        <div className="pListItem">
            <img className="pListImg"  src={hot} alt="" />
            <div  className="pListTitles">
                <h1>Hotels</h1>
                <h2>{data[0].count} hotels</h2>
            </div>
        </div>
        <div className="pListItem">
            <img className="pListImg" src={apart} alt="" />
            <div  className="pListTitles">
                <h1>Apartments</h1>
                <h2>{data[1].count} apartments</h2>
            </div>

        </div>
        <div className="pListItem">
            <img className="pListImg" src={resort} alt="" />
            <div  className="pListTitles">
                <h1>Resorts</h1>
                <h2>{data[2].count} resorts</h2>
            </div>

        </div>
        <div className="pListItem">
            <img className="pListImg" src={villa} alt="" />
            <div  className="pListTitles">
                <h1>Villas</h1>
                <h2>{data[3].count} villas</h2>
            </div>

        </div>
        <div className="pListItem">
            <img className="pListImg" src={cabin} alt="" />
            <div  className="pListTitles">
                <h1>Cabins</h1>
                <h2>{data[4].count} cabins</h2>
            </div>

        </div>
        </>}
    </div> 
    )
}
export default PropertyList;