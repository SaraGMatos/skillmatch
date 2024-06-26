import ConnectionCard from "./ConnectionCard";
import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import supabase from "../../config/config_file";
import "../styles/Connections.css";

function ConnectionsPage() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const deleteChat = async (chat_id) => {
    let { data, error } = await supabase.rpc("delete_chat", {
      chatid: chat_id,
    });
    if (error) console.error(error);

    setRefreshPage(!refreshPage);
  };

  useEffect(() => {
    setIsLoading(true);

    supabase
      .rpc("get_chats_by_user_id", { userid: user.user_id })
      .then(({ data }) => {
        const chats = data;

        async function addLastMessageTime () {
          for (const chat of chats) {
            const { data } = await supabase.rpc("get_chat_messages", {chatid: chat.chat_id,})
            if (data.length) chat.last_message_time = Date.parse(data[data.length-1].time_created)
            else chat.last_message_time = Date.now();
          }
        }
        addLastMessageTime()
        .then(()=>{
          chats.sort(function (a,b) {
            return b.last_message_time - a.last_message_time
          })

          setChats(chats);
        })
      })
      .then(() => {
        {chats.sort(function(a,b){return a.last_message_time - b.last_message_time})}
        setIsLoading(false);
      });
  }, [refreshPage]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="connections-container">
      {chats.map((chat) => {
        return (
          <div className="connection-card-group">
            <ConnectionCard chat={chat} />
            {showDelete ? (
              <button
                onClick={() => {
                  deleteChat(chat.chat_id);
                }}
              >
                <img
                  className="delete_button_graphic"
                  src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                  alt=""
                />
              </button>
            ) : null}
          </div>
        );
      })}
      <button
        className="delete_chat_button"
        onClick={() => {
          setShowDelete(!showDelete);
        }}
      >
        {showDelete ? "Hide" : "Delete chats"}
      </button>
    </div>
  );
}

export default ConnectionsPage;
