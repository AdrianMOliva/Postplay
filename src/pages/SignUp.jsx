import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = { userName, email, password };

    try {
      const { data } = await axios.post(
        "http://localhost:5005/auth/signup",
        newUser
      );
      console.log("successfully signed up", data);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Start Posting Now!</h1>
      <form onSubmit={handleSignUp}>
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
        <button>Sign Up</button>
      </form>
      <p>
        Already signed up with us? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
export default SignUp;
