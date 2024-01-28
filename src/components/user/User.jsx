import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useUser } from "../../contexts/userContext";

function User() {
  const { signOut } = useUser();
  const navigate = useNavigate();
  const userName = localStorage.getItem('name')
  function handleClick() {
    signOut();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <span>Welcome, {userName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
