import { useState } from "react";
import "./HomePage.css";

import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

function HomePage({ game }) {
  const [search, setSearch] = useState("");

  return (
    <div clasname="homePage">
      <Navbar />
      <SearchBar search={search} setSearch={setSearch} />
      <div className="gameContainer">
        {game.map((oneGame, i) => (
          <div className="gameCard" key={i}>
            <img
              className="cardImg"
              src={oneGame.covers.url}
              alt={oneGame.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
