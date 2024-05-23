import MatchCard from "./MatchCard";
import supabase from "../../config/config_file";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function MatchList() {
  const {user} = useContext(UserContext)
  const [currentUserInterests, setCurrentUserInterests] = useState([])
  const [currentUserSkills, setCurrentUserSkills] = useState([])
  const [matchedUsers, setMatchedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  

  const getUserInterests = async () => {
    let { data, error } = await supabase.rpc('get_user_interests', {
      userid: user.user_id
    })
    const userInterests = await data
    if (error) console.error(error)
    else {
      
      setCurrentUserInterests(userInterests[0])
      console.log(userInterests[0], "UserInterest")
    }
  }


  const getUserSkills = async () => {
    let { data, error } = await supabase.rpc('get_user_skills', {
      userid: user.user_id
    })
    const userSkills = await data
    if (error) console.error(error)
    else {
      setCurrentUserSkills(userSkills[0])
      console.log(userSkills[0], "UserSkills")
    }
  }


  const getMatchedUsers = async () => {
    let { data, error } = await supabase
      .rpc('get_matched_users', {
        skillid: currentUserInterests.skill_id,
        interestid: currentUserSkills.skill_id,
      })
      const userMatched = await data
    if (error) console.error(error)
    else {
      setMatchedUsers(userMatched)
      console.log(userMatched)
    }
  } 
  
  useEffect(() => {
    const innerFunc = async () => {
      setIsLoading(true)
      await getUserInterests();
      await getUserSkills();

      setTimeout(() => {
        getMatchedUsers()
    }, "10000")
      setIsLoading(false)
    }
      innerFunc()

  }, [])
     
  if (isLoading) {
   return null
 }
     
  return (
    <ul>
      {matchedUsers.map((user) => {
        return(
          <MatchCard
            avatar_url={user.avatar_url}
            username={user.username}
            user_id={user.user_id}
            key={user.user_id}
          />
        )
      })
      }
    </ul>
      );
} 

export default MatchList;
