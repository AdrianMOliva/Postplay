import { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";
import axios from "axios";

function HomePage({ game, setGame, setToggleBacklog }) {
  const [search, setSearch] = useState("");
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
      } catch (error) {
        console.log("there is an error", error);
      }
    };
    fetchGame();
  }, []);
  console.log(game);
  const filteredGame = game.filter((oneGame) =>
    oneGame.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <div className="homePage">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="gameContainer">
          {filteredGame.map((oneGame, i) => (
            <div className="gameCard" key={i}>
              <Link to={`/details/${oneGame._id}`}>
                <img
                  className="cardImg"
                  src={oneGame.covers}
                  alt={oneGame.name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
