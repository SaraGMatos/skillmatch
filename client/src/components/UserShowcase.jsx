import "../styles/showcase.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";

function UserShowcase({ userProfile }) {
  const { user } = useContext(UserContext);
  const [newShowcase, setNewShowcase] = useState(userProfile.showcase);
  const [currentShowcase, setCurrentShowcase] = useState(userProfile.showcase);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [editToggle, setEditToggle] = useState("✎ Edit showcase");
  const [isHidden, setIsHidden] = useState(true);
  const isLoggedUser = userProfile.user_id === user.user_id;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ showcase: newShowcase })
        .eq("user_id", userProfile.user_id);
    } catch (error) {
      console.log(error);
    }
    setIsEditDisabled(true);
    setIsHidden(true);
    setCurrentShowcase(newShowcase);
    setEditToggle("✎ Edit showcase");
  };

  const handleChange = (e) => {
    setNewShowcase(e.target.value);
  };

  return (
    <div className="showcase-container">
      <section className="current-showcase">{currentShowcase}</section>
      {isLoggedUser && (
        <>
          <button
            className="edit_button"
            onClick={() => {
              if (isEditDisabled) {
                setIsEditDisabled(false);
                setIsHidden(false);
                setEditToggle("Close");
              } else {
                setIsEditDisabled(true);
                setIsHidden(true);
                setEditToggle("✎ Edit showcase");
              }
            }}
          >
            {editToggle}
          </button>
          <form hidden={isHidden} onSubmit={handleOnSubmit}>
            <textarea
              disabled={isEditDisabled}
              className="textarea"
              name="showcaseContent"
              placeholder="Write your showcase here...."
              type="text"
              onChange={handleChange}
              defaultValue={currentShowcase}
            />
            <div className="button-div">
              <button className="edit_button" type="submit">
                Submit
              </button>
            </div>
          </form>{" "}
        </>
      )}
    </div>
  );
}

export default UserShowcase;
