import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingBar from "../components/RatingBar";

function RatingPage({ game, rating, setRating }) {
  const { gameId } = useParams();
  const [oneGame, setOneGame] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const videoG = game.find((videoG) => videoG._id === gameId);
    setOneGame(videoG);
  }, [game, gameId]);

  return (
    <div className="container">
      <h1></h1>
      <div className="pageContainer">
        <div className="infoContainer">
          <h2>{oneGame.name}</h2>
        </div>
        <RatingBar rating={rating} setRating={setRating} gameId={gameId} />
      </div>
    </div>
  );
}

export default RatingPage;
