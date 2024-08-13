import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function RatingBar({ rating, setRating, gameId }) {
  const [review, setReview] = useState("");
  const ratingFrame = [1, 2, 3, 4, 5];
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const handleRatingSubmit = async (newRating) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_URL}/api/ratings`,
        { gameId, rating: newRating, review, userId: user._id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setRating(newRating);
      setReview("");
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
            color: rating >= star ? "blue" : "gray",
            fontSize: `35px`,
          }}
          onClick={() => handleRatingSubmit(star)}
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
    </div>
  );
}

export default RatingBar;
