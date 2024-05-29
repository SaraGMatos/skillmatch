import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";
import "../styles/UserPage.css";
import UserpageConnect from "./UserpageConnect";

function UserPicture({ userProfile, setUserProfile }) {
  const [newProfileImage, setNewProfileImage] = useState("");
  const [isAlertImageURL, setIsAlertImageURL] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const isLoggedUser = userProfile.user_id === user.user_id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.rpc("update_user", {
      newavatarurl: newProfileImage,
      newdescription: userProfile.description,
      newshowcase: userProfile.showcase,
      newusername: userProfile.username,
      userid: userProfile.user_id,
    });
    setUser(data);
    setUserProfile(data);
  };

  useEffect(() => {
    setIsAlertImageURL(false);
  }, [userProfile]);

  const handleOnChange = (e) => {
    setNewProfileImage(e.target.value);
  };

  const handleOnClick = (e) => {
    setIsAlertImageURL(!isAlertImageURL);
  };

  return (
    <>
      <div className="UserPageComponent">
        <div className="profile_photo_container">
          {" "}
          <img src={userProfile.avatar_url} alt="" />
          {isLoggedUser ? (
            <button className="editButton" onClick={handleOnClick}>
              <img
                src="https://static.thenounproject.com/png/2473159-200.png"
                alt=""
              />
            </button>
          ) : (
            <div className="userpageConnect_container">
              <UserpageConnect userProfile={userProfile} />
            </div>
          )}
          {isAlertImageURL ? (
            <form onSubmit={handleSubmit} className="NewProfilePhotForm">
              <label htmlFor="newUrl">new photo url</label>
              <input
                onChange={handleOnChange}
                type="text"
                id="newUrl"
                value={newProfileImage}
              />
              <button type="submit">update</button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default UserPicture;
