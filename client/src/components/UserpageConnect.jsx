import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../../config/config_file";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function UserpageConnect({ userProfile }) {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const isLoggedUser = userProfile.user_id === user.user_id;
    

    async function getUser(userId) {
        let { data, error } = await supabase
            .rpc('get_user_by_id', {
                userid: userId
            })
        if (error) console.error(error)
        else return (data)
    }
    

    async function handleConnect() {
        const userIdToConnect = await getUser(id);
        
        if (!!userIdToConnect) {
            let { data, error } = await supabase.rpc("post_chat", {
                chatname: "",
            });
            const chatId = data.chat_id;
            const userId = await user.user_id;
            
            await supabase.from("UserChats").insert([
                { chat_id: chatId, user_id: userId },
                { chat_id: chatId, user_id: userIdToConnect.user_id },
            ]);
            navigate(`/connections`);
        } else {
            alert("User does not exist");
        }
    }
    

    return (
        <>
            {!isLoggedUser && (
            < button id = "userpage-connect-button" onClick = { handleConnect } >
            ✉️
            </button >
                )}
        </>
    )

}

export default UserpageConnect