import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase.config"; // Ensure 'db' is exported from your config
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let unsubscribeMetadata = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (unsubscribeMetadata) unsubscribeMetadata();

            if (!currentUser) {
                setUser(null);
                return;
            }

            // 1. Initial Claim Check
            const token = await currentUser.getIdTokenResult();
            setUser({ ...currentUser, isAdmin: token.claims.admin === true });
            unsubscribeMetadata = onSnapshot(doc(db, "user_metadata", currentUser.uid), async (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Metadata change detected! Refreshing token...");
                    
                    // Force refresh fetches the NEW custom claims from Firebase servers
                    await currentUser.getIdToken(true); 
                    const newToken = await currentUser.getIdTokenResult();
                    
                    setUser({ ...currentUser, isAdmin: newToken.claims.admin === true });
                }
            });
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeMetadata) unsubscribeMetadata();
        };
    }, []);

    async function signOutUser() {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signOutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;