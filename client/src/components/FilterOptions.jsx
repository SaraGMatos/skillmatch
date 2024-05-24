import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import supabase from "../../config/config_file";

function FilterOptions() {
  const [interests, setInterests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserInterests() {
      let { data, error } = await supabase.rpc("get_user_interests", {
        userid: user.user_id,
      });
      if (error) {
        console.error(error);
      } else {
        setInterests(data);
      }
    }
    getUserInterests();
  }, [user]);

  return (
    <div className="filter-options-container">
      <Link to="/main">
        <button>Matches</button>
      </Link>

      <div className="filter-options-dropdown-container">
        <label htmlFor="filter">Choose your desired skill:</label>
        <select name="filter" id="filter">
          {interests.map((interest) => {
            return (
              <option key={interest.skill_id} value={interest.skill_name}>
                {interest.skill_name}
              </option>
            );
          })}
        </select>
      </div>

      <Link to="/learning">
        <button>Learning</button>
      </Link>
    </div>
  );
}

export default FilterOptions;
