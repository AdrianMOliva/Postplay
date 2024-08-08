import axios from "axios";

function RatingBar({ rating, setRating, gameId }) {
  const ratingFrame = [1, 2, 3, 4, 5];

  const handleRatingSubmit = async (newRating) => {
    setRating(newRating);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:5005/api/ratings`,
        { gameId, rating: newRating },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("There was an error submitting the rating", error);
    }
  };

  return (
    <div>
      {ratingFrame.map((star) => {
        return (
          <span
            className="rateBar"
            style={{
              cursor: "pointer",
              color: rating >= star ? "blue" : "gray",
              fontSize: `35px`,
            }}
            onClick={() => {
              handleRatingSubmit(star);
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default RatingBar;
