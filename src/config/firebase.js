import { initializeApp } from "firebase/app";
import { collection,  getDocs, getFirestore } from "firebase/firestore/lite"

// web app's Firebase configuration
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
const db = getFirestore(app);

async function getCities(){
        const citiesCol = collection(db, 'cities')
        const citySnapshot = await getDocs(citiesCol)
        const cityList = [];
        citySnapshot.forEach((doc) => {
          cityList.push(doc.data());
        });
        return cityList;
}

export {
    getCities,
}