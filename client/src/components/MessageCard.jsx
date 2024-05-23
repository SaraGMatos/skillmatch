import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import '../styles/MessageCard.css'

export default function MessageCard({message}) {
    const { user } = useContext(UserContext);


    if (message.author === user.user_id) return <div class="message-card my-chat">
        <p className="message-date">{message.time_created.slice(11,16)}</p>
        <p className="message-body">{message.message}</p>
    </div>
    return <div class="message-card not-my-chat">
    <p className="message-date">{message.author.slice(0,8)} at {message.time_created.slice(11,16)}</p>
    <p className="message-body">{message.message}</p>
</div>
}