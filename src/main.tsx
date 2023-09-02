import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "firebase/firestore"
import "firebase/auth"
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyCcOP2lZRb3zONaaxpiK7guyUODil-gtu4",
    authDomain: "chat-react-13f25.firebaseapp.com",
    projectId: "chat-react-13f25",
    storageBucket: "chat-react-13f25.appspot.com",
    messagingSenderId: "1027408448118",
    appId: "1:1027408448118:web:038ce75ed1cbc7f0a3ad57",
    measurementId: "G-C0QSHJ5MWS"
};


const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
