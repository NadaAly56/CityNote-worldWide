import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useUser } from "../../contexts/userContext";

function Logo() {
  const {user, isUserSigned} = useUser()
  return (
    <Link to="/" className={styles.head}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
      {/* {isUserSigned &&
        <p>Welcome back, {user.name}</p>
      } */}
    </Link>
  );
}

export default Logo;
