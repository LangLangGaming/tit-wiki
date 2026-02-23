import React from "react";
import { useState } from "react";
import Logo from '../Logo.png';
import SignIn from "./SignIn.jsx";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <>
                    <nav className="fixed h-[72px] top-0 left-0 w-full flex items-center justify-between px-4 z-[10000] backdrop-blur-lg  "   >
                <div className="flex items-center gap-4">
                    <img src={Logo} alt="Logo" className="logo-image" width="36" height="6" />
                    <h1 className="font-nunito-sans text-2xl font-extrabold">
                        <span className="text-blue-600">Talons </span>
                        <span className="text-white">In</span>
                        <span className="text-blue-600"> Twilight</span>
                    </h1>
                </div>

                <div className="flex gap-10 items-center font-open-sans font-bold  text-lg text-gray-400">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <Link to="/wiki" className="hover:text-gray-200">Wiki</Link>
                    <Link to="/dev-diaries" className="hover:text-gray-200">Dev Diaries</Link>
                    <Link to="/credits" className="hover:text-gray-200">Credits</Link>
                    <SignIn />
                </div>
            </nav>
        </>
    )
}

export default Navbar;  