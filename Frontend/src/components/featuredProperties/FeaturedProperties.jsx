import "./featuredProperties.css"
import useFetch from "../../hooks/useFetch.js"
import imgs from "../../images/img1.jpg"


function FeaturedProperties(){
    const {data,loading,error}=useFetch("http://localhost:4000/api/hotels?featured=true&limit=4");
    //console.log(data[0]);
    return (
        <div className="fp">
        {loading ? "Loading":<>
        {data.map(item=>(
            <div className="fpItem" key={item._id}>
            <img className="fpImg" src={item.photos[0]} alt="" />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
            {item.rating &&   <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
            </div>
        }
            </div>
        ))}
    </>}
        
        </div>
    )
}
export default FeaturedProperties;