import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import '../styles/MessageCard.css'

export default function MessageCard({message, users, removeMessage}) {
    const { user } = useContext(UserContext);
    const userOfMessage = users.find(user => user.user_id === message.author)

    if (message.author === user.user_id) return <div class="message-card my-chat">
        <div>
                <p className="message-date">{message.time_created.slice(11,16)}</p>
                <p className="message-body">{message.message}</p>
            </div>
            <button onClick={(e)=>{removeMessage(e, message.message_id)}}>
                X
            </button>
        </div>
    return <div class="message-card not-my-chat">
            <p className="message-date">{userOfMessage ? userOfMessage.username : "Deleted user"} at {message.time_created.slice(11,16)}</p>
            <p className="message-body">{message.message}</p>
        </div>
}