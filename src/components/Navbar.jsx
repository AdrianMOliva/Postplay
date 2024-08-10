import "./styles.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

import { Link } from "react-router-dom";
function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className="navbarclass">
      <Link to={"/home"}>
        <img src={""} alt="Home" />
      </Link>
      <h3>Postplay</h3>

      <Link to="/profile">
        <img src={""} alt="Profile" />
      </Link>
      <Link to="/backlog">
        <h4>Backlog</h4>
      </Link>

      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Navbar;
