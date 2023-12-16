import React from "react";
import "./home.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import Featured from "../../components/featured/Featured"
import "./home.css";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

function Home(){
    return (
        <div>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <Featured/>
                <h2 className="homeTitle">Browse By Property Type</h2>
                <PropertyList/>
                <h2 className="homeTitle">Homes guests love</h2>
                <FeaturedProperties/> 
            </div>
            <MailList/>
            <Footer/>
        
        </div>
        
    )
}
export default Home;