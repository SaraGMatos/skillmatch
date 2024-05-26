import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import '../styles/MessageCard.css'

export default function MessageCard({message, users}) {
    const { user } = useContext(UserContext);
    const userOfMessage = users.find(user => user.user_id === message.author)


    if (message.author === user.user_id) return <div class="message-card my-chat">
        <p className="message-date">{message.time_created.slice(11,16)}</p>
        <p className="message-body">{message.message}</p>
    </div>
    return <div class="message-card not-my-chat">
    <p className="message-date">{userOfMessage ? userOfMessage.username : "Deleted user"} at {message.time_created.slice(11,16)}</p>
    <p className="message-body">{message.message}</p>
</div>
}