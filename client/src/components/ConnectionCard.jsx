import { useState, useEffect, useContext } from "react";
import { Link, Route } from "react-router-dom";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import "../styles/Connections.css";

function ConnectionCard({ chat }) {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [unfilteredUsers, setUnfilteredUsers] = useState ([])
  const [isLoading, setIsLoading] = useState(false);
  const [cardTitle, setCardTitle] = useState(`Chat with `);
  const [lastSeen, setLastSeen] = useState(JSON.parse(localStorage.getItem(`${chat.chat_id}_last_seen`)) || 0);
  const [lastMessageTime, setLastMessageTime] = useState(0)

  useEffect(() => {
    setIsLoading(true);

    supabase
      .rpc("get_users_by_chat_id", { chatid: chat.chat_id })
      .then(({ data }) => {
        setUnfilteredUsers(data)
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
    
    supabase
      .rpc("get_chat_messages", {
        chatid: chat.chat_id,
      })
      .then(({data})=>{
        setLastMessageTime(Date.parse(data[data.length-1].time_created))
      })
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
      {lastMessageTime > lastSeen && <div className="red-dot"></div>}
      <Link
        className="chat_intro"
        to={`/chat/${chat.chat_id}`}
        state={{ users, unfilteredUsers, chat }}
      >
        {chat.chat_name || cardTitle}
      </Link>
    </div>
  );
}

export default ConnectionCard;
