import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore/lite";
import { v4 as uuidv4 } from 'uuid';

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getCities()
        .then((data) => {
          console.log(data);
          setCities(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  async function getCities(){
    const citiesCol = collection(db, 'cities')
    const citySnapshot = await getDocs(citiesCol)
    const cityList = [];
    citySnapshot.forEach((doc) => {
      cityList.push({...doc.data(), id:doc.id});
    });
    return cityList;
}

async function getCurrentCity(id){
    setIsLoading(true)
    const cityRef = doc(db, 'cities', id)
    const citySnapshot = await getDoc(cityRef)
    setIsLoading(false)
    if (citySnapshot.exists()) {
      const city = {...citySnapshot.data(), id:citySnapshot.id}
      return city;
    }
    else return "no city exists with this id"
  }

async function addCity(data) {
  const docRef = doc(db, 'cities', uuidv4())
    await setDoc(docRef, data).then(docRef => {
      console.log("Document has been added successfully")
  })
  .catch(error => {
      console.log(error);
  })
  setCities(arr=>[...arr, data])
}

async function deleteCity(id) {
  setIsLoading(true)
  const docRef = doc(db, 'cities',id)
  await deleteDoc(docRef).then(docRef => {
    console.log("Document has been deleted")
})
.catch(error => {
    console.log(error);
}).finally(()=>setIsLoading(false))
setCities(arr=>cities.filter(c=>c.id !== id))
}
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        setCurrentCity,
        currentCity,
        getCurrentCity,
        addCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext used outside the provider");
  return context;
}
export { CitiesProvider, useCities };
