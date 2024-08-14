import "./NotFoundPage.css"
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

const nav = useNavigate();

  return (
    <div className="notFound">
      <h1>Oops 404, where am I?</h1>
      <button
          className="backButton"
          onClick={() => {
            nav("/home");
          }}
        >
          {"Go Home"}
        </button>
    </div>
  );
}

export default NotFoundPage;