import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DetailsGamePage({ game, rating }) {
  const { gameId } = useParams();
  const [oneGame, setOneGame] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const videoG = game.find((videoG) => videoG._id === gameId);
    setOneGame(videoG);
  }, [game, gameId]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/ratings/${gameId}/average`
        );
        setAverageRating(data.averageRating);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [game._id]);

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
          <h3>
            Average Rating:{" "}
            {averageRating !== null
              ? averageRating.toFixed(2)
              : "No ratings yet"}
          </h3>
          <p>
            <span>Platforms: </span>
            {oneGame.platforms}
          </p>
        </div>
        <button
          className="rateButton"
          onClick={() => {
            nav(`/rating/${oneGame._id}`);
          }}
        >
          {"RATE"}
        </button>
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
