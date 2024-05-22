import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";

function FilterOptions() {
  const { user } = useContext(UserContext);
  console.log(user);

  // Below is incomplete
  useEffect(() => {
    async function getUserInterests() {
      let { data, error } = await supabase.rpc("get_user_interests", {
        userid: user.user_id,
      });
      if (error) console.error(error);
      else console.log(data);
    }
  }, []);

  // main/exchange?interest1
  // main/learning?interest2

  return (
    <div>
      <button>Matches</button>
      <select name="filter" id="filter">
        // User Interest List
        <option value="interest 1">Interest 1</option>
        <option value="interest 2">Interest 2</option>
      </select>
      <button>Learning</button>
    </div>
  );
}

export default FilterOptions;
