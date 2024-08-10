import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DetailsGamePage({ game, rating, toggleBacklog, setToggleBacklog }) {
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
  }, [gameId]);

  const handleChange = async (index) => {
    const newToggleBacklog = [...toggleBacklog];
    newToggleBacklog[index] = !newToggleBacklog[index];

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:5005/api/games/${gameId}`,
        {
          id: oneGame._id,
          backlog: newToggleBacklog[index],
          name: oneGame.name,
          genres: oneGame.genres,
          covers: oneGame.covers,
          platforms: oneGame.platforms,
          summary: oneGame.summary,
          ratings: oneGame.ratings,
          follows: oneGame.follows,
          hypes: oneGame.hypes,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setToggleBacklog(newToggleBacklog);
      }
      console.log(response);
    } catch (error) {
      console.error("Error updating toggle state:", error);
    }
  };

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
          className="backlogButton"
          onClick={() => {
            handleChange();
          }}
        >
          {"+Backlog"}
        </button>
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
