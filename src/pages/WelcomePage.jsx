import "./WelcomePageStyle.css";
import NavbarWelcome from "../components/NavbarWelcome";
import PostLogoYellow from "../assets/POSTYellow.png";

function WelcomePage() {
  return (
    <>
      <NavbarWelcome />

      <div className="welcomeContainer">
        <div className="welcomeText">
          <h1>Play it!</h1>
          <h1>Rate it!</h1>
          <h1>Share it!</h1>
        </div>
        <img className="logoYellow" src={PostLogoYellow} alt="Logo" />
      </div>
    </>
  );
}

export default WelcomePage;
