import React from "react";
import { useState } from "react";
import Logo from '../Logo.png';
import SignIn from "./SignIn.jsx";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-[72px] flex items-center justify-between px-4 z-[10000] bg-slate-950 border-b border-slate-900"   >
                <div className="flex items-center gap-4">
                    <img src={Logo} alt="Logo" className="logo-image" width="72" height="12" />
                    <h1 className="font-black-ops text-2xl font-light">
                        <span className="text-blue-500">TALONS </span>
                        IN 
                        <span className="text-blue-500"> TWILIGHT</span>
                    </h1>
                </div>

                <div className="flex gap-10 items-center font-inter font-medium text-xl uppercase text-gray-100">
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