import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import RatingBar from "../components/RatingBar";
import ReviewsBox from "../components/ReviewsBox";
import "./RatingPage.css";

function RatingPage({ game, rating, setRating }) {
  const { gameId } = useParams();
  const [oneGame, setOneGame] = useState([]);

  useEffect(() => {
    const videoG = game.find((videoG) => videoG._id === gameId);
    setOneGame(videoG);
  }, [game, gameId]);

  return (
    <div className="ratingContainer">
      <h1></h1>
      <div className="ratingPageContainer">
        <div className="raitingInfoContainer">
          <h2>{oneGame.name}</h2>
        </div>
        <RatingBar rating={rating} setRating={setRating} gameId={gameId} />
        <ReviewsBox gameId={gameId} />
      </div>
    </div>
  );
}

export default RatingPage;
