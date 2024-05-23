import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Connections.css'

function ConnectionCard({chat}) {

  return (
    <div className="connection-card">
      <Link to={`/chat/${chat.chat_id}`}>Chat name: {chat.chat_name}</Link>
    </div>

  )
}

export default ConnectionCard;
