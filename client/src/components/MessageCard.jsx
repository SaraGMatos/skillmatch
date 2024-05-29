import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/MessageCard.css";

export default function MessageCard({ message, users, removeMessage }) {
  const { user } = useContext(UserContext);
  const userOfMessage = users.find((user) => user.user_id === message.author);

  if (message.author === user.user_id)
    return (
      <div class="message-card my-chat">
        <div>
          <p className="message-date">{message.time_created.slice(11, 16)}</p>
          <p className="message-body">{message.message}</p>
        </div>
        <button
          onClick={(e) => {
            removeMessage(e, message.message_id);
          }}
        >
          X
        </button>
      </div>
    );
  return (
    <div class="message-card not-my-chat">
      <p className="message-date">
        {userOfMessage ? (
          <Link
            className="chat-header-link"
            to={`/user/${userOfMessage.user_id}`}
          >
            {userOfMessage.username}
          </Link>
        ) : (
          "Deleted user"
        )}{" "}
        at {message.time_created.slice(11, 16)}
      </p>
      <p className="message-body">{message.message}</p>
    </div>
  );
}
