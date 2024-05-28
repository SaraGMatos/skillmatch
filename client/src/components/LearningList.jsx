import MatchCard from "./MatchCard";
import FilterOptions from "./FilterOptions";
import supabase from "../../config/config_file";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";

function LearningList() {
  const { user } = useContext(UserContext);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [hasMatches, setHasMatches] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserInterests = async () => {
    let { data, error } = await supabase.rpc("get_user_interests", {
      userid: user.user_id,
    });
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };

  const getMatchedUsers = async () => {
    const userInterests = await getUserInterests();
    const usersThatSatisfyInterest = [];

    for (const interest of userInterests) {
      let { data, error } = await supabase.rpc("get_users_by_skill", {
        skillid: interest.skill_id,
      });

      if (error) {
        continue;
      }

      usersThatSatisfyInterest.push(
        ...data.filter((person) => person.user_id !== user.user_id)
      );

      if (usersThatSatisfyInterest.length === 0) {
        setHasMatches(false);
      } else {
        setHasMatches(true);
      }
    }

    const mapFromLearningList = new Map(
      usersThatSatisfyInterest.map((match) => {
        return [match.user_id, match];
      })
    );
    const uniqueMatches = [...mapFromLearningList.values()];

    return uniqueMatches;
  };

  useEffect(() => {
    if (user.user_id) {
      getMatchedUsers().then((data) => {
        setMatchedUsers(data);
      });
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <>
        <FilterOptions />
        <Loading />
      </>
    );
  }

  return (
    <>
      <FilterOptions />
      {hasMatches ? (
        <ul className="match-list">
          {matchedUsers.map((user) => {
            return (
              <MatchCard
                avatar_url={user.avatar_url}
                username={user.username}
                user_id={user.user_id}
                key={user.user_id}
              />
            );
          })}
        </ul>
      ) : (
        <p>Sorry, there is nothing on your learning list at the moment!</p>
      )}
    </>
  );
}

export default LearningList;
