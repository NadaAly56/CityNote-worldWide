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
  query, where
} from "firebase/firestore/lite";
// import { query, where } from "@firebase/firestore";
import useDecodeToken from "../hooks/useDecodeToken";
import useLoacalStorage from "../hooks/useLocalStorage";
import { useUser } from "./userContext";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error:"",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "data/loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: [...payload] };
    case "cities/currentCity":
      return { ...state, isLoading: false, currentCity: payload };
    case "cities/created":
      return { ...state, isLoading: false, cities: [...state.cities, payload], currentCity:payload };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payload),
      };
    case "data/rejected": 
      return {...state, isLoading:false, error:payload}
    default:
      return "Unknowen type";
  }
}
function CitiesProvider({ children }) {
  const [token] = useLoacalStorage("", "token")
  const {user} = useUser()
  const decodedToken = useDecodeToken(token) 
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    console.log("token: ", decodedToken.user_id);
    async function fetchData() {
      dispatch({ type: "data/loading" });
      await getCities()
        .then((data) => {
          dispatch({ type: "cities/loaded", payload: data });
        })
        .catch((err) => dispatch({type:"data/rejected", payload:err}));
    }
    fetchData();
  }, [decodedToken.user_id, user.id]);

  async function getCities() {
    const citiesCol = collection(db, "cities");
    const citiesByUserId = query(citiesCol, where('userId', '==', decodedToken.user_id))
    const citySnapshot = await getDocs(citiesByUserId);
    const cityList = [];
    citySnapshot.forEach((doc) => {
      cityList.push({ ...doc.data(), id: doc.id });
      // setState({ ...state, cities: [...state.cities, newCity] });
    });
    dispatch({type:"cities/loaded", payload:cityList})
    console.log(cities);
    return cityList;
  }

  async function getCurrentCity(id) {
    if (id === currentCity.id) return;
    dispatch({ type: "data/loading" });
    const cityRef = doc(db, "cities", id);
    const citySnapshot = await getDoc(cityRef);
    if (citySnapshot.exists()) {
      const city = { ...citySnapshot.data(), id: citySnapshot.id };
      dispatch({ type: "cities/currentCity", payload: city });
      return city;
    } else dispatch({type:"data/rejected", payload:"no city exists with this id"})
  }

  async function addCity(data) {
    const docRef = doc(db, "cities", data.id);
    console.log(data, docRef);
    await setDoc(docRef, data)
      .then((docRef) => {
        console.log("Document has been added successfully", docRef);
        dispatch({ type: "cities/created", payload: data });
      })
      .catch((error) => {
        dispatch({type:"data/rejected", payload:error})
      });
  }

  async function deleteCity(id) {
    dispatch({ type: "data/loading" });
    const docRef = doc(db, "cities", id);
    await deleteDoc(docRef)
      .then((docRef) => {
        console.log("Document has been deleted");
        dispatch({ type: "cities/deleted", payload: id });
      })
      .catch((error) => {
        dispatch({type:"data/rejected", payload:error})
      })
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        dispatch,
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
