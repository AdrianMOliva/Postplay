import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DetailsGamePage({ game }) {
  const { gameId } = useParams();
  const [oneGame, setOneGame] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const videoG = game.find((videoG) => videoG.id === gameId);
    setOneGame(videoG);
  }, [game, gameId]);

  return (
    <div className="container">
      <h1></h1>
      <div className="pageContainer">
        <div className="infoContainer">
          <h2>{oneGame.name}</h2>
          <p>
            <span>Description: </span>
            {oneGame.summary}
          </p>

          <p>
            <span>Platforms: </span>
            {oneGame.platforms}
          </p>
        </div>
        <button
          className="backButton"
          onClick={() => {
            nav("/home");
          }}
        >
          {"<<back"}
        </button>
      </div>
    </div>
  );
}

export default DetailsGamePage;
