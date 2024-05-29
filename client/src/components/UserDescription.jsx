import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";
import "../styles/UserPage.css";

function UserDescription({ userProfile }) {
  const { user } = useContext(UserContext);
  const [newDescription, setNewDescription] = useState("");
  const [currentDescription, setCurrentDescription] = useState(
    userProfile.description
  );
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [editToggle, setEditToggle] = useState("✎ Edit description");
  const isLoggedUser = userProfile.user_id === user.user_id;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ description: newDescription })
        .eq("user_id", userProfile.user_id);
    } catch (error) {
      console.log(error);
    }
    setIsEditDisabled(true);
    setIsHidden(true);
    setCurrentDescription(newDescription);
    setEditToggle("✎ Edit description");
  };

  const handleChange = (e) => {
    setNewDescription(e.target.value);
  };

  useEffect(() => {
    setCurrentDescription(userProfile.description);
  }, [userProfile]);

  return (
    <div className="description-container">
      <section className="current-description">{currentDescription}</section>
      {isLoggedUser && (
        <>
          <button
            className="description_button"
            onClick={() => {
              if (isEditDisabled) {
                setIsEditDisabled(false);
                setIsHidden(false);
                setEditToggle("Close");
              } else {
                setIsEditDisabled(true);
                setIsHidden(true);
                setEditToggle("✎ Edit description");
              }
            }}
          >
            {editToggle}
          </button>
          <form
            class="description-form"
            hidden={isHidden}
            onSubmit={handleOnSubmit}
          >
            <textarea
              disabled={isEditDisabled}
              className="textarea"
              name="descriptionContent"
              placeholder="Write your description here...."
              type="text"
              onChange={handleChange}
              defaultValue={currentDescription}
            />
            <button className="description_button" type="submit">
              Submit
            </button>
          </form>{" "}
        </>
      )}
    </div>
  );
}

export default UserDescription;
