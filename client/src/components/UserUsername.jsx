import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";
import "../styles/UserPage.css";

function UserUsername({ userProfile }) {
  const { user } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState("");
  const [currentUsername, setCurrentUsername] = useState(userProfile.username);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [editToggle, setEditToggle] = useState("✎ Edit username");
  const isLoggedUser = userProfile.user_id === user.user_id;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ username: newUsername })
        .eq("user_id", userProfile.user_id);
    } catch (error) {
      console.log(error);
    }
    setIsEditDisabled(true);
    setIsHidden(true);
    setCurrentUsername(newUsername);
    setEditToggle("✎ Edit username");
  };

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };

  useEffect(() => {
    setCurrentUsername(userProfile.username);
  }, [userProfile]);

  return (
    <div className="username-container">
      <h1>{currentUsername}</h1>
      {isLoggedUser && (
        <>
          <button
            className="username_button"
            onClick={() => {
              if (isEditDisabled) {
                setIsEditDisabled(false);
                setIsHidden(false);
                setEditToggle("Close");
              } else {
                setIsEditDisabled(true);
                setIsHidden(true);
                setEditToggle("✎ Edit username");
              }
            }}
          >
            {editToggle}
          </button>
          <form hidden={isHidden} onSubmit={handleOnSubmit}>
            <input
              disabled={isEditDisabled}
              className="username-input"
              name="usernameContent"
              placeholder="Write your updated username here...."
              type="text"
              onChange={handleChange}
              defaultValue={currentUsername}
            />
            <button className="username_button" type="submit">
              Submit
            </button>
          </form>{" "}
        </>
      )}
    </div>
  );
}

export default UserUsername;
