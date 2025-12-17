import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const[user, setUser] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      setUser(null);
      return;
    }

    const token = await currentUser.getIdTokenResult();

    setUser({
      ...currentUser,
      isAdmin: token.claims.admin === true
    });
  });

  return unsubscribe;
}, []);

    async function signOutUser() {
        try {
        await signOut(auth);
        setUser(null);
        alert("You have been signed out.")
    } catch (error) {
        console.error("Error signing out:", error);
    }
}
return (
    <AuthContext.Provider value={{ user, setUser, signOutUser }}>
        {children}
    </AuthContext.Provider>
 )
}


export function useAuth() {
    return useContext(AuthContext);
}
export default AuthProvider;
