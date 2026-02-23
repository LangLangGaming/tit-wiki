import React from "react";
import { useState, useEffect } from "react"; // Combined imports
import { Icon } from "@iconify/react";
import { auth } from "../../firebase.config.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "./AuthContext.jsx";
import { Link } from "react-router-dom"; // Import Link for navigation

function useCloseDropdown(setOpen, active) {
  useEffect(() => {
    if (!active) return;

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
  const { user, signOutUser } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleSignIn() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  useCloseDropdown(setOpen, !!user);

  if (user) {
    console.log("uID:", user.uid);
    return (
      <div className="signin-wrapper relative inline-block w-fit">
        <button
          className="flex items-center justify-center gap-2 text-blue-500 font-bold px-4 py-2 rounded-lg hover:bg-white/5 hover:border-blue-600 border border-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <span>
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-9 h-9 rounded-full"
              referrerPolicy="no-referrer"
              width="36"
              height="36"
            />
          </span>
          {user.displayName}
        </button>

        <div className={`absolute top-full left-0 right-0 max-h-0 opacity-0 overflow-hidden transform -translate-y-1 transition-all duration-300 ${open ? 'max-h-96 opacity-100 translate-y-0' : ''} z-50`}>
          <button
            onClick={() => {
              signOutUser();
              setOpen(false);
            }}
            className="w-[calc(100%-10px)] mx-auto my-2 flex items-center justify-center gap-2 text-blue-500 font-bold px-8 py-3 rounded-lg hover:bg-white/5 hover:border-blue-600 border border-gray-700"
          >
            <Icon icon="mdi:sign-out-variant" width="24" height="24" />
            Sign Out
          </button>
          {user.isAdmin && (
            <Link 
              to="/dashboard" 
              className="dropdown-item block" 
              onClick={() => setOpen(false)}
            >
              <button className="w-[calc(100%-10px)] mx-auto my-2 flex items-center justify-center gap-2 text-red-500 font-bold px-8 py-3 rounded-lg hover:bg-white/5 hover:border-red-600 border border-gray-700">
                <Icon icon="material-symbols:dashboard-2-edit-outline" width="24" height="24" />
                Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <button className="flex items-center justify-center gap-2 text-blue-500 font-bold px-8 py-3 rounded-lg hover:bg-white/5 hover:border-blue-600 border border-gray-700" onClick={handleSignIn}>
      <Icon icon="logos:google-icon" width="24" height="24" />
      Sign In
    </button>
  );
}

export default SignIn;