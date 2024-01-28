import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore/lite";

const UserContext = createContext();

const initialState = {
  user: null,
  isUserSigned: false,
  error: "",
  isLoading: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "user/authanticated":
      return { ...state, isUserSigned: true, error: "" };
    case "user/signIn":
      return {
        ...state,
        isLoading: false,
        isUserSigned: true,
        user: payload,
        error: "",
      };
    case "user/signOut": {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      return {
        ...state,
        isLoading: false,
        isUserSigned: false,
        user: null,
        error: "",
      };
    }
    case "user/signUp":
      return initialState;
    case "rejected":
      return { ...state, isLoading: false, error: payload };
    default:
      throw new Error("Unknown Action Type");
  }
}
export default function UserProvider({ children }) {
  const [{ user, isLoading, isUserSigned, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch({ type: "user/authanticated" });
  }, []);

  async function signUp(email, pass, name) {
    return new Promise((resolve, reject) => {
      dispatch({ type: "loading" });
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCred) => {
          dispatch({ type: "user/signUp" });
          const user = userCred.user;
          const uId = user.uid;
          creatUser(uId)
            .then(() => resolve())
            .catch((err) => reject(err));
        })
        .catch((err) => {
          if (err.message === "Firebase: Error (auth/email-already-in-use).") {
            dispatch({ type: "rejected", payload: "Email is already in use" });
            reject();
          } else if (
            err.message === "Firebase: Error (auth/missing-email)." ||
            err.message === "Firebase: Error (auth/invalid-email)."
          ) {
            dispatch({
              type: "rejected",
              payload:
                "Email is required and should be in this format XXX@XXX.XX",
            });
            reject();
          } else if (
            err.message ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)." ||
            err.message ===
              "Firebase: Password should be at least 6 characters (auth/missing-password)."
          ) {
            dispatch({
              type: "rejected",
              payload: "Password should be at least 6 characters",
            });
            reject();
          } else {
            dispatch({ type: "rejected", payload: "Error occured, try again" });
            reject();
          }
        });
      const data = {
        name,
      };
      async function creatUser(uId) {
        const userRef = doc(db, "users", uId);
        await setDoc(userRef, data)
          .then(() => {
            console.log("user added to firestore");
          })
          .catch((err) => {
            dispatch({ type: "rejected", payload: err });
            reject(err.message);
          });
      }
    });
  }

  async function signIn(email, pass) {
    dispatch({ type: "loading" });
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCred) => {
        const userRef = doc(db, `users`, userCred.user.uid);
        getDoc(userRef).then((userSnapshot) => {
          if (userSnapshot.exists()) {
            localStorage.setItem("token", userCred.user.accessToken);
            localStorage.setItem("name", userSnapshot.data().name);
            const userObj = {
              ...userSnapshot.data(),
              email: userCred.user.email,
              id: userCred.user.uid,
            };
            dispatch({ type: "user/signIn", payload: userObj });
          }
        });
      })
      .catch((err) =>
        dispatch({ type: "rejected", payload: "Invalid Email or Password" })
      );
  }

  async function signOut() {
    dispatch({ type: "user/signOut" });
  }
  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        dispatch,
        isLoading,
        isUserSigned,
        error,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext used outside the provider");
  return context;
}
export { UserProvider, useUser };
