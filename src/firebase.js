// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9cVUOvywedoGhvNlFCplw7y_JWBFrnPI",
  authDomain: "college-event-portal-edc53.firebaseapp.com",
  projectId: "college-event-portal-edc53",
  storageBucket: "college-event-portal-edc53.firebasestorage.app",
  messagingSenderId: "669732751502",
  appId: "1:669732751502:web:eb7de5449f7c350b6f21df",
  measurementId: "G-0HGWE7LKZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };