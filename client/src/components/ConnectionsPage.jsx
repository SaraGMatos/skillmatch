import ConnectionCard from "./ConnectionCard";
import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import supabase from "../../config/config_file";
import '../styles/Connections.css'

function ConnectionsPage() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(()=>{
    setIsLoading(true)
    
    supabase.rpc('get_chats_by_user_id', {userid: user.user_id})
    .then(({data})=>{
      setChats(data)
    }).then(()=>{
      setIsLoading(false)
    })

  }, [])

  if (isLoading) return <h2>Loading...</h2>

  return (
    <div className="connections-container">
    {chats.map((chat)=>{
      return <ConnectionCard chat={chat}/>
    })}
    </div>
  );
}

export default ConnectionsPage;
