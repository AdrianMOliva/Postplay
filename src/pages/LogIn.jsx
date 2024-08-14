import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import "./LogIn.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userLogin = { email, password };

    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/login",
        userLogin
      );
      console.log("successfully logged in", data);
      localStorage.setItem("authToken", data.authToken);
      await authenticateUser();
      nav("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="logDiv">
      <h1>Welcome back!</h1>
      <form className="logForm" onSubmit={handleLogin}>
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
        <button className="logButton">Login</button>
      </form>
      <p>
        Don´t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};
export default Login;
