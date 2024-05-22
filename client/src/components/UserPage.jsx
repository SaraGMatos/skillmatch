import UserInterests from "./UserInterests";
import UserIntroSkills from "./UserIntroSkills";
import UserPicture from "./UserPicture";
import UserReviews from "./UserReviews";
import UserShowcase from "./UserShowcase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/config_file";

import "../styles/UserPage.css";

function UserPage() {
  const [user, setUser] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [interestIsVisible, setInterestIsVisible] = useState(false);
  console.log(avatarUrl);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const authId = await supabase.auth.getUser();

      const userId = authId.data.user.id;

      let { data, error } = await supabase.rpc("get_user_by_id", {
        userid: userId,
      });
      setAvatarUrl(data.avatar_url);
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }

  const handleToggle = () => {
    setInterestIsVisible(!interestIsVisible);
  };

  return (
    <>
      <div>
        <img src={avatarUrl} alt="" />
      </div>
      {/* Components below can be wrapped in an expandable */}
      <div>
        <button onClick={handleToggle}>
          User Interest {interestIsVisible ? <p>&uarr;</p> : <p> &darr;</p>}
        </button>
        {interestIsVisible && <UserInterests />}
      </div>

      <UserIntroSkills />
      <UserShowcase />
      <UserReviews />
    </>
  );
}

export default UserPage;
