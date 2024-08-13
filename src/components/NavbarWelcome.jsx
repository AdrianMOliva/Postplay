import "./styles.css";
import PostLogo from "../assets/POSTLogo.png";

import { Link } from "react-router-dom";
function NavbarWelcome() {
  return (
    <div className="navbarWelcomeClass">
      <img className="logo" src={PostLogo} alt="PostPlay" />

      <div className="signingButtons">
        <Link to="/signup">
          <h4>Sign Up</h4>
        </Link>
        <Link to="/login">
          <h4>Log In</h4>
        </Link>
      </div>
    </div>
  );
}

export default NavbarWelcome;
