// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS5eyTpGxDzlL-7fiajIVUHLRWPb7l_5M",
  authDomain: "volectrosheets.firebaseapp.com",
  projectId: "volectrosheets",
  storageBucket: "volectrosheets.firebasestorage.app",
  messagingSenderId: "408907811406",
  appId: "1:408907811406:web:fec053df41c791479f511f",
  measurementId: "G-E5RL6GQCBQ"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
