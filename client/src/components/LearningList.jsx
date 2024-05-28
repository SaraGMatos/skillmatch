import MatchCard from "./MatchCard";
import FilterOptions from "./FilterOptions";
import supabase from "../../config/config_file";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";
import "../styles/Main.css";

function LearningList() {
  const { user } = useContext(UserContext);
  const [currentSortBy, setCurrentSortBy] = useState("");
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
    let uniqueMatches = [...mapFromLearningList.values()];

    return uniqueMatches;
  };

  useEffect(() => {
    setIsLoading(true);
    setHasMatches(true);

    if (user.user_id) {
      getMatchedUsers()
        .then((data) => {
          setMatchedUsers(data);
        })
        .then(() => {
          if (currentSortBy.length > 0) {
            supabase
              .rpc("get_skill_id_by_name", {
                skillname: currentSortBy,
              })
              .then(({ data }) => {
                supabase
                  .rpc("get_users_by_skill", {
                    skillid: data,
                  })
                  .then(({ data }) => {
                    setMatchedUsers(data);
                    if (data.length === 0) {
                      setHasMatches(false);
                    }
                    setIsLoading(false);
                  });
              });
          } else {
            setIsLoading(false);
          }
        });
    }
  }, [user, currentSortBy]);

  return (
    <>
      <FilterOptions setCurrentSortBy={setCurrentSortBy} />
      {!isLoading ? (
        hasMatches ? (
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
        )
      ) : (
        <Loading />
      )}
    </>
  );
}

export default LearningList;
