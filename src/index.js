// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk1a6o77beNfR-jpRvOFB7cMQeNSAzG9Y",
  authDomain: "aquafusion-b8744.firebaseapp.com",
  databaseURL: "https://aquafusion-b8744-default-rtdb.firebaseio.com",
  projectId: "aquafusion-b8744",
  storageBucket: "aquafusion-b8744.appspot.com",
  messagingSenderId: "981233492296",
  appId: "1:981233492296:web:93ea538d8816580277137d",
  measurementId: "G-EGPW2JTWEF",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
