import MatchCard from "./MatchCard";
import supabase from "../../config/config_file";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";

function MatchList({ currentSortBy }) {
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

  const getUserSkills = async () => {
    let { data, error } = await supabase.rpc("get_user_skills", {
      userid: user.user_id,
    });
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };

  const getMatchedUsers = async () => {
    const usersThatSatisfyInterest = [];
    const usersThatWantMySkills = [];
    const userInterests = await getUserInterests();
    const userSkills = await getUserSkills();

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
    }

    for (const skill of userSkills) {
      let { data, error } = await supabase.rpc("get_users_by_interest", {
        skillid: skill.skill_id,
      });

      if (error) {
        continue;
      }

      usersThatWantMySkills.push(
        ...data.filter((person) => person.user_id !== user.user_id)
      );
    }

    const matches = usersThatSatisfyInterest.filter(
      (userThatHasTheSkillIWant) =>
        usersThatWantMySkills.some(
          (userThatWantsMySkill) =>
            userThatHasTheSkillIWant.user_id === userThatWantsMySkill.user_id
        )
    );

    const mapFromMatches = new Map(
      matches.map((match) => {
        return [match.user_id, match];
      })
    );
    const uniqueMatches = [...mapFromMatches.values()];

    if (matches.length === 0) {
      setHasMatches(false);
    } else {
      setHasMatches(true);
    }

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
          <p>Sorry, you don't have any matches at the moment!</p>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}

export default MatchList;
