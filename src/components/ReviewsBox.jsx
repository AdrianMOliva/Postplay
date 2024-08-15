import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./styles.css";

function ReviewsBox({ gameId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
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

    fetchReviews();
  }, [gameId]);

  return (
    <div className="reviewsContainer">
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="reviewCard" key={review._id}>
            <p>User: {review.userId.userName}</p>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.review}</p>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}

export default ReviewsBox;
