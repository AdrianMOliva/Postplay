import { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

function HomePage({ game }) {
  const [search, setSearch] = useState("");

  /*const filteredGame = game.filter((oneGame) =>
    oneGame.name.toLowerCase().includes(search.toLowerCase())
  );*/
  return (
    <div clasname="homePage">
      <Navbar />
      <SearchBar search={search} setSearch={setSearch} />
      <div className="gameContainer">
        {game.map((oneGame, i) => (
          <div className="gameCard" key={i}>
            <Link to={`/details/${oneGame.id}`}>
              <img
                className="cardImg"
                src={oneGame.covers.url}
                alt={oneGame.name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
