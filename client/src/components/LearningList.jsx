import MatchCard from "./MatchCard";
import supabase from "../../config/config_file";
import { useEffect, useState } from "react";

function LearningList() {
  const [currentUserId, setCurrentUserId] = useState()
  const [currentUserInterests, setCurrentUserInterests] = useState([])
  const [usersWithReqSkill, setUsersWithReqSkill] = useState([])
 
  const getUserData = async () => {
    const authId = await supabase.auth.getUser();
        const userId = authId.data.user.id;
    setCurrentUserId(userId)
  }


  const getUserInterests = async () => { 
    let { data, error } = await supabase.rpc('get_user_interests', {
      userid: currentUserId
    })
    if (error) console.error(error)
    else setCurrentUserInterests(data[0])
  }  
   
  const getUsersMatchedSkills = async () => {
    let { data, error } = await supabase.rpc('get_users_by_skill', {
            skillid: currentUserInterests.skill_id
    })
    console.log(data, "data here")
          if (error) console.error(error)
          else setUsersWithReqSkill(data)
  }

  useEffect(() => {
    const learningTab = async () => { 
      await getUserData();
      const userInterest = await getUserInterests();
      await getUsersMatchedSkills(userInterest)
      
    }
    learningTab()   
  }, []) 
   
    
  
  return (
    <ul>
    {usersWithReqSkill.map((user) => {
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
  )
}

export default LearningList;