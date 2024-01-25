import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "dataLoading":
      return { ...state, isLoading: true };
    case "getAllCities":
      return { ...state, isLoading: false, cities: payload };
    case "getCurrentCity":
      return { ...state, isLoading: false, currentCity: payload };
    case "addCity":
      return { ...state, isLoading: false, cities: [...state.cities, payload] };
    case "deleteCity":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payload),
      };
    default:
      return "Unknowen type";
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "dataLoading" });
      await getCities()
        .then((data) => {
          dispatch({ type: "getAllCities", payload: data });
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  async function getCities() {
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = [];
    citySnapshot.forEach((doc) => {
      cityList.push({ ...doc.data(), id: doc.id });
      console.log({ ...doc.data(), id: doc.id });
    });
    console.log(cities);
    return cityList;
  }

  async function getCurrentCity(id) {
    dispatch({ type: "dataLoading" });
    const cityRef = doc(db, "cities", id);
    const citySnapshot = await getDoc(cityRef);
    if (citySnapshot.exists()) {
      const city = { ...citySnapshot.data(), id: citySnapshot.id };
      dispatch({ type: "getCurrentCity", payload: city });
      return city;
    } else return "no city exists with this id";
  }

  async function addCity(data) {
    const docRef = doc(db, "cities", data.id);
    console.log(data, docRef);
    await setDoc(docRef, data)
      .then((docRef) => {
        console.log("Document has been added successfully", docRef);
        dispatch({ type: "addCity", payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteCity(id) {
    dispatch({ type: "dataLoading" });
    const docRef = doc(db, "cities", id);
    await deleteDoc(docRef)
      .then((docRef) => {
        console.log("Document has been deleted");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "deleteCity", payload: id });
      });
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        addCity,
        deleteCity,
        getCities,
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
