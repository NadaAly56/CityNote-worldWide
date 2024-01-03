// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from  "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYc45KU4AoS6fQLAytry3c5MVOXF3iHHQ",
  authDomain: "world-wise1.firebaseapp.com",
  projectId: "world-wise1",
  storageBucket: "world-wise1.appspot.com",
  messagingSenderId: "808928754928",
  appId: "1:808928754928:web:68b1c508785c8406bd5635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
