import { useEffect, useState } from "react";
import styles from "./styles/Login.module.css";
import { NavBar } from "../components/navbar/navBar";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import Button from "../components/button/Button";

export default function Login() {
  const { signIn,  isLoading, user } = useUser()
  const navigate = useNavigate()
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  
  async function handleSignIn(e){
    e.preventDefault()
    await signIn(email, password)
    if (user.name) {
      navigate('/app')
    }
    console.log("user", user);
}
  useEffect(()=>{
    if (user.name) return navigate('/')
  },[user])
  return (
    <main className={styles.login}>
      <NavBar />
      <form className={`${styles.form} ${isLoading? styles.loading:''}`}>
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
        <Button type='primary' onClick={handleSignIn}>
                {isLoading?'Loading...':'Log in'}
            </Button>
        </div>
      </form>
    </main>
  );
}
