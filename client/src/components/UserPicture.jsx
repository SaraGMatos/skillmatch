import { useState, useEffect } from "react";
import supabase from "../../config/config_file";

import { UserContext } from "../contexts/UserContext";
import "../styles/UserPage.css";

import "../styles/UserPage.css";

function UserPicture({ userProfile, setUserProfile }) {
  const [newProfileImage, setNewProfileImage] = useState("");
  const [isAlertImageURL, setIsAlertImageURL] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.rpc("update_user", {
      newavatarurl: newProfileImage,
      newdescription: userProfile.description,
      newshowcase: userProfile.showcase,
      newusername: userProfile.username,
      userid: userProfile.user_id,
    });
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
        <img src={userProfile.avatar_url} alt="" />
        <button className="editButton" onClick={handleOnClick}>
          <img
            src="https://static.thenounproject.com/png/2473159-200.png"
            alt=""
          />
        </button>
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
    </>
  );
}

export default UserPicture;
