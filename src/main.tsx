import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "firebase/firestore"
import "firebase/auth"
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {

  apiKey: "AIzaSyD5xI0-iQHsyGmZTBS-_fPuRWNNKTLi0eE",

  authDomain: "fsdfsd-6fd2e.firebaseapp.com",

  projectId: "fsdfsd-6fd2e",

  storageBucket: "fsdfsd-6fd2e.appspot.com",

  messagingSenderId: "921994643060",

  appId: "1:921994643060:web:428e18dc5c24b92630f321",

  measurementId: "G-GH34GCYZB3"

};


const app = initializeApp(firebaseConfig)



export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,
)
