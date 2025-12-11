import React from "react";
import '../css/Navbar.css';
import { useState } from "react";
import Logo from '../Logo.png';
import SignIn from "./SignIn.jsx";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={Logo} alt="Logo" className="logo-image" width="72" height="12" />
                    <h1 className="logo"> <span className="blue">TALONS </span>IN <span className="blue">TWILIGHT</span>
                    </h1>
                </div>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/wiki">Wiki</Link>
                    <Link to="/dev-diaries">Dev Diaries</Link>
                    <Link to="/credits">Credits</Link>
                    <SignIn />
                </div>
            </nav>
        </>
    )
}

export default Navbar;  