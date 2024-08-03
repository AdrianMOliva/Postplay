import "./styles.css";

import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbarclass">
      <Link to={"/"}>
        <img src={""} alt="light logo" />
      </Link>
      <h3>Postplay</h3>

      <Link to="/profile">
        <img src={""} alt="heart" />
      </Link>

      <img src={""} alt="add food" />

      <img style={{}} src={""} alt="question Mark" />
    </div>
  );
}

export default Navbar;
