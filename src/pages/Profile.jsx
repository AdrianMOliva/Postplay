import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";
import "./Profile.css";

function UserProfile() {
  const { user, isLoading } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user || !user._id) return;

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/auth/users/${user._id}/reviews`,
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
  }, [user, isLoading]);

  const handleDeleteReview = async (reviewId) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/ratings/${reviewId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (isLoading) {
    return <div className="loadingContainer">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <h1 className="profileHeader">{`${user.userName}’s Profile`}</h1>
        <h2 className="profileSubheader">Your Reviews</h2>
        {reviews.length > 0 ? (
          <div className="reviewBox">
            {reviews.map((review) => (
              <div key={review._id} className="reviewContainer">
                {/*<p>
                  Game: <span>{review.gameId.name}</span>
                </p>*/}
                <p>
                  Rating: <span>{review.rating}</span>
                </p>
                <p>
                  Review: <span>{review.review}</span>
                </p>
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="noReviewsMessage">No reviews found.</p>
        )}
      </div>
    </>
  );
}

export default UserProfile;
