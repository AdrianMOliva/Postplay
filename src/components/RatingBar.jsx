import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "./styles.css";

function RatingBar({ rating, setRating, gameId }) {
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const ratingFrame = [1, 2, 3, 4, 5];
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const handleRatingSubmit = async () => {
    if (selectedRating === 0) {
      alert("Please select a rating.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_URL}/api/ratings`,
        { gameId, rating: selectedRating, review, userId: user._id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setRating(selectedRating);
      setReview("");
      setSelectedRating(0);
      nav(`/details/${gameId}`);
    } catch (error) {
      console.error("There was an error submitting the rating", error);
    }
  };

  return (
    <div>
      {ratingFrame.map((star, i) => (
        <span
          className="rateBar"
          key={i}
          style={{
            cursor: "pointer",
            color: selectedRating >= star ? "gold" : "gray",
            fontSize: `35px`,
          }}
          onClick={() => setSelectedRating(star)}
        >
          {" "}
          ★{" "}
        </span>
      ))}
      <div>
        <textarea
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button className="ratingButton" onClick={handleRatingSubmit}>
        Submit
      </button>
      <button
        className="backButton"
        onClick={() => {
          nav(`/details/${oneGame._id}`);
          setRating(0);
        }}
      >
        {"<<back"}
      </button>
    </div>
  );
}

export default RatingBar;
