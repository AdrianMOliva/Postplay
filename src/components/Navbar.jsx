import "./styles.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import postLogo from "../assets/POSTLogo.png";
import profileLogo from "../assets/profileLogo.png";

import { Link } from "react-router-dom";
function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className="navbarclass">
      <Link to={"/home"}>
        <img className="logoHome" src={postLogo} alt="Home" />
      </Link>

      <div className="logosDiv">
        <Link to="/profile">
          <h4>Profile</h4>
        </Link>
        <Link to="/backlog">
          <h4>Backlog</h4>
        </Link>

        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default Navbar;
