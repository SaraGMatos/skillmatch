import { Link, useNavigate } from "react-router-dom";
import "../styles/BurgerMenu.css";
import supabase from "../../config/config_file";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function UserDropdown() {
<<<<<<< fixing_userpage_display
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
=======
  const navigate = useNavigate();
  let myId = "";

  async function myProfile() {
    const authId = await supabase.auth.getUser();
    myId = authId.data.user.id;
    navigate(`/user/${myId}`);
  }

  async function getUser(username) {
    let { data, error } = await supabase
      .from("Users")
      .select("user_id")
      .eq("username", username);

    if (data[0]) {
      return data[0].user_id;
    } else {
      alert("Username doesn't exist!");
    }
  }

  async function handleConnect() {
    const usernameToConnect = prompt("Username: (case sensitive) ");
    const userIdToConnect = await getUser(usernameToConnect);
    //Create and navigate to chat
    //If chat exists navigate to it instead

    console.log();
  }
>>>>>>> master

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
        <Link id="dropdown-link" onClick={myProfile}>
          My Profile
        </Link>
        <Link id="dropdown-link" onClick={handleConnect}>
          Connect
        </Link>
        <Link id="dropdown-link" onClick={loggingOut}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default UserDropdown;
