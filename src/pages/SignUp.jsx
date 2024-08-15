import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "./SignUp.css";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = { userName, email, password };

    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, newUser);
      console.log("successfully signed up", data);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signDiv">
      <h1>Start Posting Now!</h1>
      <form className="signForm" onSubmit={handleSignUp}>
        <label>
          UserName:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="signUpButton">Sign Up</button>
      </form>
      <p>
        Already one of us? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
export default SignUp;
