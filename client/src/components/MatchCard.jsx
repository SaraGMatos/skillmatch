import { Link } from "react-router-dom";

function MatchCard({ avatar_url, username, user_id }) {
  return (
    <div>
      <img src={avatar_url} />
      <p>{username}</p>
      <Link to={`/user/${username}`}>GO</Link>
    </div>
  );
}

export default MatchCard;
