import { Link, useLocation } from "react-router-dom";
import supabase from "../../config/config_file";
import "../styles/App.css";
import { useEffect, useState } from "react";

function MatchCard({ avatar_url, username, user_id }) {
  const location = useLocation();
  const isLearningList = location.pathname === "/learning";
  const [userInterests, setUserInterests] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  const getUserInterests = async () => {
    let { data, error } = await supabase.rpc("get_user_interests", {
      userid: user_id,
    });
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };

  const getUserSkills = async () => {
    let { data, error } = await supabase.rpc("get_user_skills", {
      userid: user_id,
    });
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };

  useEffect(() => {
    getUserInterests().then((data) => {
      let mappedInterests = data.map((interest) => interest.skill_name);
      setUserInterests(mappedInterests);
    });

    getUserSkills().then((data) => {
      let mappedSkills = data.map((skill) => skill.skill_name);
      setUserSkills(mappedSkills);
    });
  }, []);

  return (
    <div className="match-card">
      <img src={avatar_url} />
      <h4>{username}</h4>
      {isLearningList ? null : (
        <p>
          Interests:{" "}
          {userInterests.length !== 0
            ? userInterests.toString().replace(/,/g, ", ")
            : "Nothing here yet!"}
        </p>
      )}

      <p>Skills: {userSkills.toString().replace(/,/g, ", ")}</p>
      <Link to={`/user/${user_id}`}>GO</Link>
    </div>
  );
}

export default MatchCard;
