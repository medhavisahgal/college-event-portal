// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export { db }; 