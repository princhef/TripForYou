import "./mailList.css"

function MailList(){
    return (
        <div className="mail">
            <h1 className="mailTitle">Save Time, save Money!</h1>
            <span className="mailDesc">Sign Up and get the best deals</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="Your Email"/>
                <button>Subscribe</button>
            </div>

        </div>
    )
}

export default MailList