import "./featured.css"
import igms from "../../images/img1.jpg";
import kolkata from "../../images/kolkata.jpg";
import delhi from "../../images/delhi.jpg";
import mumbai from "../../images/mumbai.jpg";

import useFetch from "../../hooks/useFetch.js";
function Featured(){
    
    const {data,loading,error}=useFetch("http://localhost:4000/api/hotels/countByCity?cities=kolkata,delhi,mumbai");
    //console.log(data);
    return (
        <div className="featured">
            <div className="featuredItem">
                <img className="featuredImg" src={kolkata} alt="asfaf" />
                <div className="featuredTitles">
                    <h1>Kolkata</h1>
                    <h2>{data[0]}</h2>
                </div>
            </div>
            <div className="featuredItem">
            <img className="featuredImg" src={delhi} alt="asfaf" />
                <div className="featuredTitles">
                    <h1>Delhi</h1>
                    <h2>{data[1]}</h2>
                </div>
            </div>
            <div className="featuredItem">
            <img className="featuredImg" src={mumbai} alt="asfaf" />
                <div className="featuredTitles">
                    <h1>Mumbai</h1>
                    <h2>{data[2]}</h2>
                </div>
            </div>

        </div>
    )

}
export default Featured;