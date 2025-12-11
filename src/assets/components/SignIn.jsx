import React from "react";
import '../css/SignIn.css';
import { useState } from "react";
import { Icon } from "@iconify/react";

function SignIn() {

    return (
        <>
            <button className="sign-in-button"> 
                <Icon icon="simple-icons:google" width="24" height="24" />
                Sign In
                </button>
        </>
    )
}

export default SignIn;