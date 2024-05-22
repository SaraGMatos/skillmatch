import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";

const socket = io.connect("https://skillmatch-production.up.railway.app/");

export default function Chat({chatId}) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  chatId = "b89a4b86-df60-4f32-9a80-049ee3612646";

  const fetchMessages = async ()=> {
    let { data, error } = await supabase
    .rpc('get_chat_messages', {
    chatid: chatId
    })
    if (error) console.error(error)
    else {
    setMessages(data)
    }
  }

  const postMessage = async ()=> {

    let { data, error } = await supabase
    .rpc('post_message', {
      author: user.user_id, 
      chatid: chatId, 
      message: message
    })
    if (error) console.error(error)

    fetchMessages();
  }

  const joinRoom = () => {
    if (chatId !== "") socket.emit("join_room", chatId);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message, room: chatId });
    postMessage();
  };


  joinRoom();

  useEffect(() => {
    setIsLoading(true)
    const innerFunc = async () => {
      await fetchMessages()
      setIsLoading(false)
    }
    innerFunc()

    socket.on("receive_message", (data) => {
      fetchMessages();
    });
  }, [socket]);

  if (isLoading) return <h2>Loading chat...</h2>;

  return (
    <div className="chat">
      <section id="messages-list">
        {messages.map((mess)=>{
          return <p>{mess.message}</p>
        })}
      </section>

      <form id="chat-message-form">
        <input
          placeholder="Message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button onClick={sendMessage} type="submit">
          Send message
        </button>
      </form>
    </div>
  );
}
