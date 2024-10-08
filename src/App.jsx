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
import DetailsGamePage from "./pages/DetailsGamePage";
import RatingPage from "./pages/RatingPage";
import BacklogPage from "./pages/BacklogPage";
import NotFoundPage from "./pages/NotFoundPage";
import { API_URL } from "./config";

function App() {
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [toggleBacklog, setToggleBacklog] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/api/games`, {
          headers: { authorization: `Bearer ${token}` },
        });
        console.log(data);
        setGame(data);
        setToggleBacklog(Array(data.length).fill(false));
      } catch (err) {
        console.log("there is an error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, []);

  if (loading) {
    return <div className="loadingDiv">Loading game data...</div>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<HomePage game={game} setGame={setGame} />}
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path="/details/:gameId"
          element={
            <DetailsGamePage
              game={game}
              rating={rating}
              toggleBacklog={toggleBacklog}
              setToggleBacklog={setToggleBacklog}
            />
          }
        />
        <Route
          path="/rating/:gameId"
          element={
            <RatingPage game={game} rating={rating} setRating={setRating} />
          }
        />
        <Route
          path="/backlog"
          element={
            <BacklogPage
              game={game}
              toggleBacklog={toggleBacklog}
              setToggleBacklog={setToggleBacklog}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
