import React, { useEffect, useState } from 'react'
import styles from "./styles/Login.module.css";
import { NavBar } from "../components/navbar/navBar";
import Button from '../components/button/Button';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
export default function SignUpPage() {
  const navigate = useNavigate()
    const { signUp, isLoading, error, dispatch } = useUser()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("qwerty");
    const [name, setName] = useState('')
    
    async function handleSignUp(e){
        e.preventDefault()
        if (name && email && password)
          signUp(email, password, name)
          .then(()=>navigate('/login', {replace:true}))
        else dispatch({type:"rejected", payload:"All fields are required"})
          // .catch((err)=>console.log(err))
          

       
    }
    return (
      <main className={styles.login}>
        <NavBar />
        <form className={`${styles.form} ${isLoading? styles.loading:''}`}>
          {
            error && <div className={styles.error}>{error}</div>
          }
          <div className={styles.row}>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
  
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
  
          <div>
            <Button type='primary' onClick={handleSignUp}>
                {isLoading?'Loading...':'Sign Up'}
            </Button>
          </div>
        </form>
      </main>
    );
}
