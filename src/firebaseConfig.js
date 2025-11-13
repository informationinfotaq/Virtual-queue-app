import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9q4lIDN6A-aZyjnxLq6OWWWxpYNupcVg",
  authDomain: "virtual-queue-app-1cda6.firebaseapp.com",
  projectId: "virtual-queue-app-1cda6",
  storageBucket: "virtual-queue-app-1cda6.firebasestorage.app",
  messagingSenderId: "503597888083",
  appId: "1:503597888083:web:3f8da40a9a548fc5ec0ca6",
  measurementId: "G-Y589RQ314G"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


