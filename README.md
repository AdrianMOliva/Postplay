# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


//let timestamp = 1696852441;

// JavaScript `Date` object takes milliseconds, so multiply by 1000
let date = new Date(timestamp * 1000);

// Custom formatting options
let options = {
  year: 'numeric', 
  month: 'long', 
  day: 'numeric'
};

console.log("Formatted Date:", date.toLocaleDateString('en-US', options));



import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingBar from "../components/RatingBar";
import axios from "axios";
import { AuthContext } from "../contexts/Auth.context";
import { API_URL } from "../../config";

function RatingPage({ game, rating, setRating }) {
  const { gameId } = useParams();
  const [oneGame, setOneGame] = useState({});
  const [reviews, setReviews] = useState([]);
  const { user, isLoading } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    const videoG = game.find((videoG) => videoG._id === gameId);
    setOneGame(videoG);
  }, [game, gameId]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user || !user._id) return;

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/api/ratings/${gameId}/reviews`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (!isLoading) {
      fetchReviews();
    }
  }, [user, isLoading, gameId]);

  /*return (
    <div className="container">
      <Navbar />
      <div className="pageContainer">
        <div className="infoContainer">
          <h2>{oneGame.name}</h2>
        </div>
        <RatingBar rating={rating} setRating={setRating} gameId={gameId} />
        <button
          className="backButton"
          onClick={() => {
            nav(`/details/${oneGame._id}`);
            setRating(0);
          }}
        >
          {"<<back"}
        </button>
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <p>User: {review.user.userName}</p>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              {user && user._id === review.user._id && (
                <button
                  onClick={async () => {
                    const token = localStorage.getItem("authToken");
                    try {
                      await axios.delete(
                        `${API_URL}/api/ratings/${review._id}`,
                        {
                          headers: { authorization: `Bearer ${token}` },
                        }
                      );
                      setReviews(reviews.filter((r) => r._id !== review._id));
                    } catch (error) {
                      console.error("Error deleting review:", error);
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
}

export default RatingPage;*/