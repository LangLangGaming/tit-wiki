// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbKqwtThvc3nIWcRx8CA52gHcWFY63CDY",
  authDomain: "talons-in-twilight.firebaseapp.com",
  projectId: "talons-in-twilight",
  storageBucket: "talons-in-twilight.firebasestorage.app",
  messagingSenderId: "827803326052",
  appId: "1:827803326052:web:4c8cb90b16cada635bb171"
};
;

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };