import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import '../styles/MessageCard.css'

export default function MessageCard({message}) {
    const { user } = useContext(UserContext);

    if (message.author === user.user_id) return <p className="my-chat">{message.message} - {message.time_created.slice(11,16)}</p>
    return <p className="not-my-chat">{message.message} - {message.time_created.slice(11,16)}</p>
}