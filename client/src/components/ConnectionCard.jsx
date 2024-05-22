import { Link } from "react-router-dom";

function ConnectionCard({chatId}) {
  return <Link to={`/chat/${chatId}`}>Test Chat</Link>
}

export default ConnectionCard;
