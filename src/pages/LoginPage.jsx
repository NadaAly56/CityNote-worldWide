import { useEffect, useState } from "react";
import styles from "./styles/Login.module.css";
import { NavBar } from "../components/navbar/navBar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import Button from "../components/button/Button";

export default function Login() {
  const { signIn,  isLoading, isUserSigned, error, dispatch } = useUser()
  const navigate = useNavigate()
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  
  async function handleSubmit(e){
    e.preventDefault()
    if (email && password)
    signIn(email, password)
else dispatch({type:"rejected", payload:"Please fill all data"})
    
    // console.log("user", user);
}
  useEffect(()=>{
    if (isUserSigned)
       navigate('/app', {replace:true})
  },[isUserSigned, navigate])
  return (
    <main className={styles.login}>
      <NavBar />
      <form className={`${styles.form} ${isLoading? styles.loading:''}`}
      onSubmit={handleSubmit}
      >
        {
            error && <div className={styles.error}>{error}</div>
          }
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
        <Button type='primary'>
                {isLoading?'Loading...':'Log in'}
            </Button>
        </div>
      </form>
    </main>
  );
}
