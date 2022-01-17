import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import "./Header.css"

const Header = () => {
    // Deklarera state "activeTab" och sätt defaultvärde till home
    const [activeTab, setActiveTab] = useState("home");

    // Deklarera location som håller koll på ändringar i URLen
    const location = useLocation();
    useEffect(() => {
        // Om URL är startsida
        if(location.pathname === "/") {
            // Ange ny state till activeTab
            setActiveTab("Home")
            // Om URL är /add
        } else if (location.pathname === "/add") {
            // Ange ny state till activeTab
            setActiveTab("Adduser")
            // Om url är /about
        } else if (location.pathname === "/about") {
            // Ange ny state till activeTab
            setActiveTab("About") 
        }
    }, [location])
    return (
        <div className='header'>
            <p className='logo'>Marcus Recenserar</p>
            <div className='header-right'>
                <Link to="/">
                    <p className={`${activeTab === "Home" ? "active" : ""}`}onClick={() => setActiveTab("Home")}>Start</p>
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "Adduser" ? "active" : ""}`} onClick={() => setActiveTab("Adduser")}>Lägg till film</p>
                </Link>
                <Link to="/about">
                    <p className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>Om sidan</p>
                </Link>
            </div>
        </div>
    )
}

export default Header
