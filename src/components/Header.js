import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState("home");

    const location = useLocation();
    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab("Home")
        } else if (location.pathname === "/add") {
            setActiveTab("Adduser")
        } else if (location.pathname === "/about") {
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
