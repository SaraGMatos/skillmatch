import MatchCard from "./MatchCard";
import supabase from "../../config/config_file";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function MatchList() {
  const { user } = useContext(UserContext);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [hasMatches, setHasMatches] = useState(false);

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
      console.log("interest skill id", interest.skill_id);
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
    console.log("user interests", userInterests);
    console.log("user skills", userSkills);
    console.log(
      "users that have sought after skills",
      usersThatSatisfyInterest
    );
    console.log("users I can help", usersThatWantMySkills);
    console.log(matches);

    if (matches.length === 0) {
      setHasMatches(false);
    } else {
      setHasMatches(true);
    }

    return matches;
  };

  useEffect(() => {
    if (user.user_id) {
      getMatchedUsers().then((data) => {
        setMatchedUsers(data);
      });
    }
  }, [user]);

  return (
    <>
      {hasMatches ? (
        <ul>
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
        <p>Sorry you don't have any matches at the moment!</p>
      )}
    </>
  );
}

export default MatchList;
