// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAF__q8AmUbTLb7moz1vU4Z8KOR5A9_Cac",
  authDomain: "crexai.firebaseapp.com",
  projectId: "crexai",
  storageBucket: "crexai.firebasestorage.app",
  messagingSenderId: "327226925257",
  appId: "1:327226925257:web:678077ac42a41e7d5d6d18",
  measurementId: "G-VLNDKJ5KJW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth };
