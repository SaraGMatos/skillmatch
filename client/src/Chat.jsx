import io from "socket.io-client"
import {useEffect, useState} from "react"

const socket = io.connect("https://skillmatch-production.up.railway.app/")

export default function Chat(room) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const joinRoom = () => {
    if (room!== "") socket.emit("join_room", room)
  }

  const sendMessage = (e)=> {
    e.preventDefault()
    socket.emit("send_message", {message , room})
    //Optimistic rendering, setIsLoading, POST request to messages table (providing all table keys), GET request to messages table to setMessages
  }

  useEffect(()=>{
    //GET request to messages table to setMessages()
    // .then(()=>{
    //     setIsLoading(false)
    // })

    socket.on("receive_message", (data)=>{
      //GET request to messages table to setMessages()
    //   setIsLoading(true)
    })
  }, [socket])

  joinRoom()

  if (isLoading) return <h2>Loading chat...</h2>

  return (
    <div className="chat">
        <section id="messages-list">
            {/* The line below would ideally add message cards with user, date_posted and message body instead of just text. */}
            { messages.map( currentMessage => { return <p>{currentMessage}</p> })}
        </section>
        <form id="chat-message-form">
            <input placeholder='Message...' onChange={(e) => {setMessage(e.target.value)}}></input>
            <button onClick={sendMessage} type="submit" >Send message</button>
        </form>
    </div>
  );
}