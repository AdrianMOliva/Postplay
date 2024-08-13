import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import Navbar from "../components/Navbar";

function UserProfile() {
  const { user, isLoading } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user || !user._id) return;

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5005/auth/users/${user._id}/reviews`,
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
      await axios.delete(`http://localhost:5005/api/ratings/${reviewId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>{`${user.userName}´s Profile`}</h1>
        <h2>Your Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <p>Game: {review.gameId.name}</p>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              <button onClick={() => handleDeleteReview(review._id)}>
                Delete Review
              </button>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </>
  );
}

export default UserProfile;
