// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCLzRHfZ-b-zlc7gA8iHRhZneXrGC9mrFU",
  authDomain: "react-2pm-9b69f.firebaseapp.com",
  projectId: "react-2pm-9b69f",
  storageBucket: "react-2pm-9b69f.appspot.com",
  messagingSenderId: "590517763362",
  appId: "1:590517763362:web:869450dc555d9de5ba397b",
  measurementId: "G-2W6M0ZBSYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);