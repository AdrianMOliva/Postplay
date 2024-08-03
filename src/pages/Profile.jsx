import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import Navbar from "../components/Navbar";

const Profile = () => {
  const ourContext = useContext(AuthContext);
  console.log("here is the name", ourContext);
  return (
    <div>
      <Navbar />
      <h2>{ourContext.user.userName}'s Profile</h2>
    </div>
  );
};
export default Profile;
