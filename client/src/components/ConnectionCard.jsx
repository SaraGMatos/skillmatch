import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import supabase from "../../config/config_file";
import '../styles/Connections.css'

function ConnectionCard({chat}) {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardTitle, setCardTitle] = useState(`Chat with `)

  useEffect (()=>{
    setIsLoading(true)

    supabase.rpc('get_users_by_chat_id', {chatid: chat.chat_id})
    .then(({data})=>{
      setUsers(data)
      let cardTitleText = data[0].username
      for (let index = 1; index < data.length; index++) {
        cardTitleText += `, ${data[index].username}`
      }
      setCardTitle(`Chat with ` + cardTitleText)
    }).then(()=>{
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <h2>Loading...</h2>

  return (
    <div className="connection-card">
      <Link to={`/chat/${chat.chat_id}`} state={{users, chat}}>{chat.chat_name || cardTitle}</Link>
    </div>

  )
}

export default ConnectionCard;
