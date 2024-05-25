import UserInterests from "./UserInterests";
import UserIntroSkills from "./UserIntroSkills";
import UserPicture from "./UserPicture";
import UserReviews from "./UserReviews";
import UserShowcase from "./UserShowcase";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import "../styles/UserPage.css";

import "../styles/UserPage.css";

function UserPage() {
  const { user, setUser } = useContext(UserContext);
  const [interestIsVisible, setInterestIsVisible] = useState(false);
  const [skillsIsVisible, setSkillsIsVisible] = useState(false);
  const [showcaseIsVisible, setShowcaseIsVisible] = useState(false);

  const navigate = useNavigate();

  // async function signOutUser() {
  //   const { error } = await supabase.auth.signOut();
  //   navigate("/");
  // }

  const handleToggleInterest = () => {
    setInterestIsVisible(!interestIsVisible);
  };

  const handleToggleSkills = () => {
    setSkillsIsVisible(!skillsIsVisible);
  };

  const handleToggleShowcase = () => {
    setShowcaseIsVisible(!showcaseIsVisible);
  };

  return (
    <>
      <div className="UserPageComponent">
        {/* Components below can be wrapped in an expandable */}
        <UserPicture />
        <div className="each_User_Page_Section">
          <button className="buttonToggle" onClick={handleToggleInterest}>
            User Interest{" "}
            <img
              className={
                interestIsVisible ? "arrow_button_down" : "arrow_button_right"
              }
              src="../src/graphics/arrow_button.png"
              alt=""
            />
          </button>

          {interestIsVisible && <UserInterests />}
        </div>

        <div className="each_User_Page_Section">
          <button className="buttonToggle" onClick={handleToggleSkills}>
            User Skills{" "}
            <img
              className={
                skillsIsVisible ? "arrow_button_down" : "arrow_button_right"
              }
              src="../src/graphics/arrow_button.png"
              alt=""
            />
          </button>
          {skillsIsVisible && <UserIntroSkills />}
        </div>

        <div className="each_User_Page_Section">
          <button className="buttonToggle" onClick={handleToggleShowcase}>
            User Showcase{" "}
            <img
              className={
                showcaseIsVisible ? "arrow_button_down" : "arrow_button_right"
              }
              src="../src/graphics/arrow_button.png"
              alt=""
            />
          </button>
          {showcaseIsVisible && <UserShowcase />}
        </div>

        <UserReviews />
      </div>
    </>
  );
}

export default UserPage;
