import { Link, useNavigate } from "react-router-dom";
import "../styles/BurgerMenu.css";
import supabase from "../../config/config_file";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function UserDropdown() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function loggingOut() {
    if (confirm("Are you sure you want to log out?")) {
      const { error } = await supabase.auth.signOut();
      setUser({});
      navigate("/");
    }
  }

  return (
    <div className="user-dropdown">
      <button className="dropdown-button">
        <img
          className="profile-pic"
          src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
        />
      </button>
      <div className="dropdown-content">
        <Link id="dropdown-link" to="/user">
          My Profile
        </Link>
        <Link id="dropdown-link">Connect</Link>
        <Link id="dropdown-link" onClick={loggingOut}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default UserDropdown;
