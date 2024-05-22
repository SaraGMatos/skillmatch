import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import supabase from "../../config/config_file";

function FilterOptions() {
  const [interests, setInterests] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user);

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
  }, []);

  return (
    <div>
      <button>Matches</button>
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
      <button>Learning</button>
    </div>
  );
}

export default FilterOptions;
