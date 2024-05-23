import { Link } from "react-router-dom";

function MatchCard({ avatar_url, username, user_id }) {
  // User img
  // Match info
  // Arrow icon - link to User profile
  return (
    <div>
      <img src={avatar_url} />
      <p>{username}</p>
      <Link to={`/user/${user_id}`}>
        GO
      </Link>
    </div>
  )
}

export default MatchCard;
