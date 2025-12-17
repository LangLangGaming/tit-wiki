import React from "react";
import '../css/SignIn.css';
import { useState } from "react";
import { Icon } from "@iconify/react";
import { auth } from "../../firebase.config.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "./AuthContext.jsx";
import { useEffect } from "react";

function useCloseDropdown(setOpen, active) {
  useEffect(() => {
    if (!active) return; // only run when user is signed in

    const handleClickOutside = (event) => {
      if (!event.target.closest('.signin-wrapper')) {
        setOpen(false);                                                                   
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [active, setOpen]);
} 

function SignIn() {
    const {user, signOutUser}   = useAuth();
    const [open, setOpen] = useState(false);
    async function handleSignIn() {
        await signInWithPopup(auth, new GoogleAuthProvider());

    }

     useCloseDropdown(setOpen, !!user);

     
if (user) {
  return (
    <div className="signin-wrapper">
      <button
        className="sign-in-button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <span>
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="user-avatar"
            referrerPolicy="no-referrer"
            width="36"
            height="36"
          />
        </span>
        {user.displayName}
      </button>

      <div className={`dropdown-menu ${open ? "open" : ""}`}>
        <button
          onClick={() => {
            signOutUser();
            setOpen(false);
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

    return (
        <>
            <button className="sign-in-button" onClick={handleSignIn}> 
                <Icon icon="simple-icons:google" width="24" height="24" />
                Sign In
                </button>
        </>
    )
}

export default SignIn;