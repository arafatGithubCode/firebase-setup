import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV24WwhkCWIR3vehkuzje5SGiep9WtSRs",
  authDomain: "setup-firebase-a5d93.firebaseapp.com",
  projectId: "setup-firebase-a5d93",
  storageBucket: "setup-firebase-a5d93.appspot.com",
  messagingSenderId: "702064209644",
  appId: "1:702064209644:web:eb68db614ae1ead754bfc9",
  measurementId: "G-XXPNPESFG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
