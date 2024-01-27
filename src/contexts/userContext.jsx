  import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, validatePassword } from 'firebase/auth'
  import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
  import { auth, db } from '../config/firebase'
  import { doc, getDoc, setDoc } from '@firebase/firestore/lite'
  import { useNavigate } from 'react-router-dom'

  const UserContext = createContext()

  const initialState = {
    user:{},
    isUserSigned: false,
    error:"",
    isLoading: false,
  }

  function reducer( state, {type, payload}) {
    switch (type) {
      case "loading":
        return {...state, isLoading:true}
      case "user/authanticated":
          return {...state, isLoading: false, isUserSigned: payload}
      case "user/signIn":
        return {...state, isLoading: false, isUserSigned: true, user:payload}
      case "user/signOut":
        return {...state, isLoading: false, isUserSigned: false, user:null}
      case "user/SignUp":
        return {...state, isLoading: false, isUserSigned: false, user:null}
      case "rejected":
          return {...state, isLoading:false, error:payload}
      default:
        return "Unknown Action Type"
    }
  } 
  export default function UserProvider({children}) {
    const [{user, isLoading, isUserSigned, error}, dispatch] 
    = useReducer(reducer, initialState)
      // const [user, setUser] = useState({})
      // const [isUserSigned, setIsUserSigned] = useState(false)
      // const [error, setError] = useState('')
      // const [isLoading, setIsLoading] = useState(false)
      const token = localStorage.getItem('token')
      const navigate = useNavigate()

      useEffect(()=>{
        console.log(''==false);
        if (token) dispatch({type:"user/authanticated", payload:true})
        else {
          dispatch({type:"user/signOut"})
        }
      },[token])
      async function signUp(email, pass, name) {
        dispatch({type:"loading"})
          createUserWithEmailAndPassword(auth, email, pass).then((userCred)=>{
            const user = userCred.user
            const uId = user.uid
            console.log("if in auth", uId);
              console.log("user added succesfully", userCred);
              return creatUser(uId)
          }).catch((err)=>{
            if (err.message === "Firebase: Error (auth/email-already-in-use).")
              dispatch({type:"rejeced", payload:"Email is already in use"})      
            else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
              dispatch({type:"rejeced", payload:"invalid email format"}) 
            else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
              dispatch({type:"rejeced", payload:"Password should be at least 6 characters"}) 
            else dispatch({type:"rejeced", payload:"Error occured, try again"}) 
            
          })
          const data = {
            name,
          }
          async function creatUser(uId){
            console.log("id in fun", uId);
            const userRef = doc(db, 'users', uId)
            await setDoc(userRef, data).then(()=>{
              console.log('user added to firestore')
            }).catch((err)=>{
              dispatch({type:"rejeced", payload:err}) 
            })
          }
          
      }

      async function signIn(email, pass) {
        dispatch({type:"loading"}) 
          signInWithEmailAndPassword(auth, email, pass).then((userCred)=>{
              console.log("signed in",userCred);
              navigate("/app")
          }).catch((err)=> dispatch({type:"rejeced", payload:err}) )
         
      }
  function getUserData() {
    onAuthStateChanged(auth, async (userSigned)=>{
      if (userSigned) {
        localStorage.setItem('token', userSigned.accessToken)
        
        const uId = userSigned.uid
        const email = userSigned.email
        const userRef = doc(db, `users`, uId)
        const userSnapshot = await getDoc(userRef)
        if (userSnapshot.exists()) {
          const userObj = {...userSnapshot.data(), email, id:uId}
          dispatch({type:"user/signIn", payload:userObj}) 
        }
        else console.log("user not found");
      }
      else {
        console.log("user signed out");
      }
    })
  }
      

      async function handleSignOut() {
        signOut(auth).then(()=>{
          localStorage.removeItem('token')
          dispatch({type:"user/signOut"})
        }).catch((err)=>{
          console.log(err);
        })
      }
    return <UserContext.Provider value={{
      user,
      signUp,
      signIn,
      isLoading,
      isUserSigned,
      error,
      handleSignOut,
      getUserData
    }}>
      {children}
    </UserContext.Provider>
  }
  function useUser() {
      const context = useContext(UserContext);
      if (context === undefined)
        throw new Error("UserContext used outside the provider");
      return context;
    }
  export {
      UserProvider,
      useUser
  }
