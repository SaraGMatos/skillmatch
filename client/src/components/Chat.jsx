import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import "../styles/MessageCard.css";
import MessageCard from "./MessageCard";
import { useParams, useLocation } from "react-router-dom";

const socket = io.connect("https://skillmatch-production.up.railway.app/");

export default function Chat() {
  const { users, chat } = useLocation().state;
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let headerTitle = `Chat with ${users[0].username}`;

  for (let index = 1; index < users.length; index++) {
    headerTitle += `, ${users[index].username}`;
  }

  const chatId = id;

  const fetchMessages = async () => {
    let { data, error } = await supabase.rpc("get_chat_messages", {
      chatid: chatId,
    });
    if (error) console.error(error);
    else {
      setMessages(data);
    }
  };

  const postMessage = async () => {
    let { data, error } = await supabase.rpc("post_message", {
      author: user.user_id,
      chatid: chatId,
      message: message,
    });
    if (error) console.error(error);

    fetchMessages();
  };

  const deleteMessage = async (e, message_id) => {
    let { data, error } = await supabase.rpc("delete_message", {
      messageid: message_id,
    });
    if (error) console.error(error);

    fetchMessages();
  };

  const joinRoom = () => {
    if (chatId !== "") socket.emit("join_room", chatId);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message, room: chatId });
    postMessage();
  };

  const removeMessage = (e, message_id) => {
    e.preventDefault();
    socket.emit("send_message", { message: "", room: chatId });
    deleteMessage(e, message_id);
  };

  joinRoom();

  useEffect(() => {
    setIsLoading(true);
    const innerFunc = async () => {
      await fetchMessages();
      setIsLoading(false);
    };
    innerFunc();

    socket.on("receive_message", (data) => {
      fetchMessages();
    });
  }, [socket]);

  if (isLoading) return <h2>Loading chat...</h2>;

  return (
    <div className="chat">
      <section id="chat-header" className="chat-header">
        {" "}
        <h4>{chat.chat_name || headerTitle}</h4>
      </section>
      <section id="messages-list" className="messages-list">
        {messages.toReversed().map((mess) => {
          return (
            <MessageCard
              message={mess}
              users={users}
              removeMessage={removeMessage}
            />
          );
        })}
      </section>

      <form id="chat-message-form" className="chat-message-form">
        <input
          placeholder="Message..."
          class="chat-input"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button onClick={sendMessage} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
