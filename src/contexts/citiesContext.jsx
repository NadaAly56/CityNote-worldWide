import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

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
      cityList.push(doc.data());
    });
    return cityList;
}

async function getCurrentCity(id){
    setIsLoading(true)
    const cityCol = doc(db, 'cities', id)
    const citySnapshot = await getDoc(cityCol)
    setIsLoading(false)
    if (citySnapshot.exists()) {
      const city = citySnapshot.data()
      return city;
    }
    else return "no city exists with this id"
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        setCurrentCity,
        currentCity,
        getCurrentCity,
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
