import UserInterests from "./UserInterests";
import UserIntroSkills from "./UserIntroSkills";
import UserPicture from "./UserPicture";
import UserReviews from "./UserReviews";
import UserShowcase from "./UserShowcase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../config/config_file";
import "../styles/UserPage.css";

function UserPage() {
  const [interestIsVisible, setInterestIsVisible] = useState(false);
  const [skillsIsVisible, setSkillsIsVisible] = useState(false);
  const [showcaseIsVisible, setShowcaseIsVisible] = useState(false);
  const [reviewsIsVisible, setReviewsIsVisible] = useState(false)
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();

  const getUserById = async () => {
    let { data, error } = await supabase.rpc("get_user_by_id", {
      userid: id,
    });
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  };

  useEffect(() => {
    setInterestIsVisible(false);
    setSkillsIsVisible(false);
    setShowcaseIsVisible(false);

    if (id) {
      getUserById().then((data) => {
        setUserProfile(data);
      });
    }
  }, [id]);

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
    setReviewsIsVisible(!reviewsIsVisible);
  };

  return (
    <>
      <div className="UserPageComponent">
        {/* Components below can be wrapped in an expandable */}

        <div className="each_User_Page_Section">
          <UserPicture
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
          <div>
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
          </div>
          {interestIsVisible && <UserInterests userProfile={userProfile} />}
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
          {skillsIsVisible && <UserIntroSkills userProfile={userProfile} />}
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
          {showcaseIsVisible && <UserShowcase userProfile={userProfile} />}
        </div>

        <div className="each_User_Page_Section">
          <button className="buttonToggle" onClick={handleToggleReviews}>
            User Reviews {" "}
            <img
              className={
                reviewsIsVisible ? "arrow_button_down" : "arrow_button_right"
              }
              src="../src/graphics/arrow_button.png"
              alt=""
            />
          </button>
          {reviewsIsVisible && <UserReviews />}
        </div>


      </div>
      
    </>
  );
}

export default UserPage;
