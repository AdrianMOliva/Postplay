import { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

function HomePage({ game }) {
  const [search, setSearch] = useState("");

  const filteredGame = game.filter((oneGame) =>
    oneGame.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default HomePage;
