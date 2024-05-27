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

function UserPage() {
  
  const { user, setUser } = useContext(UserContext);
  const [interestIsVisible, setInterestIsVisible] = useState(false);
  const [skillsIsVisible, setSkillsIsVisible] = useState(false);
  const [showcaseIsVisible, setShowcaseIsVisible] = useState(false);
  const [reviewsIsVisible, setReviewsIsVisible] = useState(false)

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

  const handleToggleReviews = () => {
    setReviewsIsVisible(!reviewsIsVisible)
  }

  return (
    <>
      <div className="UserPageComponent">
        {/* Components below can be wrapped in an expandable */}
        <UserPicture />
        <div>
          <button className="buttonToggle" onClick={handleToggleInterest}>
            User Interest {interestIsVisible ? <p>&uarr;</p> : <p> &darr;</p>}
          </button>

          {interestIsVisible && <UserInterests />}
        </div>

        <div>
          <button className="buttonToggle" onClick={handleToggleSkills}>
            User Skills {skillsIsVisible ? <p>&uarr;</p> : <p> &darr;</p>}
          </button>
          {skillsIsVisible && <UserIntroSkills />}
        </div>

        <div>
          <button className="buttonToggle" onClick={handleToggleShowcase}>
            User Showcase {showcaseIsVisible ? <p>&uarr;</p> : <p> &darr;</p>}
          </button>
          {showcaseIsVisible && <UserShowcase />}
        </div>

        <div>
          <button className="buttonToggle" onClick={handleToggleReviews}>
            User Reviews {reviewsIsVisible ? <p>&uarr;</p> : <p> &darr;</p>}
          </button>
          {reviewsIsVisible && <UserReviews />}
        </div>
        
      </div>
    </>
  );
}

export default UserPage;
