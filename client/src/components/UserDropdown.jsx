import { Link, useNavigate } from "react-router-dom";
import "../styles/BurgerMenu.css";
import supabase from "../../config/config_file";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function UserDropdown() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  async function myProfile() {
    const id = await user.user_id;
    navigate(`/user/${id}`);
  }

  async function getUser(username) {
    let { data, error } = await supabase
      .from("Users")
      .select("user_id")
      .eq("username", username);

    // if (data[0]) {
    //   return data[0].user_id;
    // } else {
    //   alert("Username doesn't exist!");
    // }
    return data[0];
  }

  async function handleConnect() {
    const usernameToConnect = prompt("Username: (case sensitive) ");
    const userIdToConnect = await getUser(usernameToConnect);
    if (!!userIdToConnect) {
      let { data, error } = await supabase.rpc("post_chat", {
        chatname: usernameToConnect,
      });
      const chatId = data.chat_id;
      const id = await user.user_id;
      await supabase.from("UserChats").insert([
        { chat_id: chatId, user_id: id },
        { chat_id: chatId, user_id: userIdToConnect.user_id },
      ]);
      navigate(`/chat/${chatId}`);
    } else {
      alert("Username doesn't exist!");
    }
  }

  async function loggingOut() {
    if (confirm("Are you sure you want to log out?")) {
      const { error } = await supabase.auth.signOut();
      navigate("/");
      setUser({});
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
