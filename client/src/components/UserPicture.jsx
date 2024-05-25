import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import "../styles/UserPage.css";

import "../styles/UserPage.css";
function UserPicture() {
  const { user, setUser } = useContext(UserContext);
  const [newProfileImage, setNewProfileImage] = useState("");
  const [isAlertImageURL, setIsAlertImageURL] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.rpc("update_user", {
      newavatarurl: newProfileImage,
      newdescription: user.description,
      newshowcase: user.showcase,
      newusername: user.username,
      userid: user.user_id,
    });
    setUser(data);
  };

  useEffect(() => {
    setIsAlertImageURL(false);
  }, [user]);

  const handleOnChange = (e) => {
    setNewProfileImage(e.target.value);
  };

  const handleOnClick = (e) => {
    setIsAlertImageURL(!isAlertImageURL);
  };

  return (
    <>
      <div className="UserPageComponent">
        <img src={user.avatar_url} alt="" />
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
