import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function BacklogPage({ game, toggleBacklog, setToggleBacklog }) {
  const backloggedGame = game.filter((videoG) => videoG.backlog === true);

  const handleChange = async (index) => {
    const newToggleBacklog = [...toggleBacklog];
    newToggleBacklog[index] = !newToggleBacklog[index];

    try {
      const gameId = backloggedGame[index]._id;
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_URL}/api/games/${gameId}`,
        {
          id: backloggedGame._id,
          backlog: newToggleBacklog[index],
          name: backloggedGame.name,
          genres: backloggedGame.genres,
          covers: backloggedGame.covers,
          platforms: backloggedGame.platforms,
          summary: backloggedGame.summary,
          ratings: backloggedGame.ratings,
          follows: backloggedGame.follows,
          hypes: backloggedGame.hypes,
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
    <>
      <Navbar />
      <div className="cardContainer">
        {backloggedGame.map((videoG, i) => (
          <div className="card" key={i}>
            <img className="cardImg" src={videoG.covers} alt={videoG.name} />
            <button
              onClick={() => {
                handleChange(i);
              }}
              className={`btn-like ${toggleBacklog[i] ? "on" : "off"}`}
            >
              <img src={""} alt="delete" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default BacklogPage;
