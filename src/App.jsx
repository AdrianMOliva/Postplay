import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import IsPrivate from "./components/IsPrivate";
import Profile from "./pages/Profile";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [game, setGame] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get("http://localhost:5005/api/games", {
          headers: { authorization: `Bearer ${token}` },
        });

        setGame(data);
      } catch (err) {
        console.log("there is an error", err);
      }
    };
    fetchGame();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage game={game} />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
