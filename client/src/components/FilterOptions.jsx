import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import supabase from "../../config/config_file";
import "../styles/Main.css";

function FilterOptions({ setCurrentSortBy }) {
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
      <div className="filter-options-dropdown-container">
        <label htmlFor="filter">Choose your desired skill:</label>
        <select
          name="filter"
          id="filter"
          onChange={(event) => {
            setCurrentSortBy(event.target.value);
          }}
        >
          <option value="">Select</option>
          {interests.map((interest) => {
            return (
              <option key={interest.skill_id} value={interest.skill_name}>
                {interest.skill_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filter_buttons">
        <Link to="/main">
          <button className="button_filter_component">Matches</button>
        </Link>
        <Link to="/learning">
          <button button className="button_filter_component">
            Learning
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FilterOptions;
