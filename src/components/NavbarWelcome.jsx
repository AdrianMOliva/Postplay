import "./styles.css";

import { Link } from "react-router-dom";
function NavbarWelcome() {
  return (
    <div className="navbarWelcomeClass">
      <img src={""} alt="light logo" />

      <h3>Postplay</h3>

      <Link to="/signup">
        <img src={""} alt="heart" />
      </Link>
      <Link to="/login">
        <img src={""} alt="add food" />
      </Link>
      <img style={{}} src={""} alt="question Mark" />
    </div>
  );
}

export default NavbarWelcome;
