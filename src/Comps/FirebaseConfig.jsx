// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfUeFJaWcLHEkQQArgOYU3o7qFzXLeEmY",
    authDomain: "e-commerce-a7821.firebaseapp.com",
    projectId: "e-commerce-a7821",
    storageBucket: "e-commerce-a7821.firebasestorage.app",
    messagingSenderId: "220044638783",
    appId: "1:220044638783:web:5f703f1c5c4c0b0db4168a",
    measurementId: "G-8TH199B264"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;