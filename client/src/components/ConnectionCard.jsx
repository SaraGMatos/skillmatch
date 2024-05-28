import { useState, useEffect, useContext } from "react";
import { Link, Route } from "react-router-dom";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import "../styles/Connections.css";

function ConnectionCard({ chat }) {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardTitle, setCardTitle] = useState(`Chat with `);

  useEffect(() => {
    setIsLoading(true);

    supabase
      .rpc("get_users_by_chat_id", { chatid: chat.chat_id })
      .then(({ data }) => {
        const filteredUsers = data.filter((item) => {
          return item.user_id !== user.user_id;
        });
        setUsers(filteredUsers);
        let cardTitleText = filteredUsers[0]
          ? filteredUsers[0].username
          : "New Chat";
        for (let index = 1; index < filteredUsers.length; index++) {
          cardTitleText += `, ${filteredUsers[index].username}`;
        }
        setCardTitle(`Chat with ` + cardTitleText);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="connection-card">
      <img
        src={
          users[0]
            ? users[0].avatar_url
            : "https://e7.pngegg.com/pngimages/981/645/png-clipart-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-thumbnail.png"
        }
        alt=""
      />
      <Link
        className="chat_intro"
        to={`/chat/${chat.chat_id}`}
        state={{ users, chat }}
      >
        {chat.chat_name || cardTitle}
      </Link>
    </div>
  );
}

export default ConnectionCard;
