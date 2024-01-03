import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, validatePassword } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import { doc, getDoc, setDoc } from '@firebase/firestore/lite'

const UserContext = createContext()
export default function UserProvider({children}) {
    const [user, setUser] = useState({})
    const [isUserSigned, setIsUserSigned] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(()=>{
      console.log(''==false);
      if (token) setIsUserSigned(true)
      else {
        setIsUserSigned(false)
        setUser({})
      }
    },[token])
    async function signUp(email, pass, name) {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, pass).then((userCred)=>{
          const user = userCred.user
          const uId = user.uid
          console.log("if in auth", uId);
            console.log("user added succesfully", userCred);
            return creatUser(uId)
        }).catch((err)=>{
          if (err.message === "Firebase: Error (auth/email-already-in-use).")
            setError("Email is already in use")           
          else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
          setError("invalid email format")
          else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
            setError("Password should be at least 6 characters")
          else setError("Error occured, try again")
          
        }).finally(()=>setIsLoading(false))

        const data = {
          name,
        }
        async function creatUser(uId){
          console.log("id in fun", uId);
          const userRef = doc(db, 'users', uId)
           await setDoc(userRef, data).then(()=>{
            console.log('user added to firestore')
           }).catch((err)=>{
            console.log(err);
           }).finally(()=>setIsLoading(false))
        }
        
    }

    async function signIn(email, pass) {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, pass).then((userCred)=>{
            console.log("signed in",userCred);
        }).catch((err)=>console.log(err)).finally(()=>setIsLoading(false))
    }
 function getUserData() {
   onAuthStateChanged(auth, async (userSigned)=>{
    if (userSigned) {
      localStorage.setItem('token', userSigned.accessToken)
      setIsUserSigned(true)
      const uId = userSigned.uid
      const email = userSigned.email
      const userRef = doc(db, `users`, uId)
      const userSnapshot = await getDoc(userRef)
      if (userSnapshot.exists()) {
        const userObj = {...userSnapshot.data(), email, id:uId}
        setUser(userObj)
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
        setIsUserSigned(false)
        setUser({})
      }).catch((err)=>{
        console.log(err);
      })
    }
  return <UserContext.Provider value={{
    user,
    setUser,
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
