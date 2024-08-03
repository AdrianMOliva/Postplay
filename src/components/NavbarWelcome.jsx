import "./styles.css";

import { Link } from "react-router-dom";
function NavbarWelcome() {
  return (
    <div className="navbarWelcomeClass">
      <img src={""} alt="light logo" />

      <h3>Postplay</h3>

      <Link to="/signup">
        <h4>Sign Up</h4>
      </Link>
      <Link to="/login">
        <h4>Log In</h4>
      </Link>
    </div>
  );
}

export default NavbarWelcome;
