import "./searchItem.css"
import img1 from "../../images/img1.jpg"
import { Link } from "react-router-dom"

function SearchItem({item}){
    return (
        /*<div className="searchItem">
            <img src={img1} alt="" className="siImg"/>
            <div className="siDesc">
                <h1 className="siTitle">Tower Street Apartments</h1>
                <div className="siDistance">500m from center</div>
                <span className="siTaxiOp">Free Airport Taxi</span>
                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                <span className="siFeatures">Entire studio * 1 bathroom * 1 bed</span>
                <div className="siCancelOp">Free cancellation</div>
                <span className="siCancelOpSubtitle">You can cancel later so lock in this great price!</span>

            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className="siDetailsText">
                    <span className="siPrice">$250</span>
                    <span className="siTaxOp">Includes Taxes</span>
                    <button className="siCheckButton">See availiability</button>
                </div>
            </div>
        </div>*/
        <div className="searchItem">
            <img src={item.photos[0]} alt="" className="siImg"/>
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <div className="siDistance">{item.distance}m from center</div>
                <span className="siTaxiOp">Free Airport Taxi</span>
                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                
                <div className="siCancelOp">Free cancellation</div>
                <span className="siCancelOpSubtitle">You can cancel later so lock in this great price!</span>

            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailsText">
                    <span className="siPrice">₹{item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes Taxes</span>
                    <Link to={`/hotels/${item._id}`}>
                    <button className="siCheckButton">See availiability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SearchItem