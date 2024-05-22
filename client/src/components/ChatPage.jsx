import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import Chat from "./Chat";

function ChatPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext);

    return (
        <>
        <h2>{user.name}</h2>
        <Chat chatId={id}/>
        </>
    )
    
}

export default ChatPage;
