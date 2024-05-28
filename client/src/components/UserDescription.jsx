import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";

function UserDescription({ userProfile }) {
  const { user } = useContext(UserContext);
  const [newDescription, setNewDescription] = useState("");
  const [currentDescription, setCurrentDescription] = useState(
    userProfile.description
  );
  const [isEditDisabled, setIsEditDisabled] = useState(true);
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
    setCurrentDescription(newDescription);
  };

  const handleChange = (e) => {
    setNewDescription(e.target.value);
  };

  useEffect(() => {
    setCurrentDescription(userProfile.description);
  }, [userProfile, newDescription]);

  return (
    <div className="description-container">
      <section>{currentDescription}</section>
      {isLoggedUser && (
        <>
          <button
            onClick={() => {
              if (isEditDisabled) {
                setIsEditDisabled(false);
              } else {
                setIsEditDisabled(true);
              }
            }}
          >
            Edit your description
          </button>
          <form onSubmit={handleOnSubmit}>
            <textarea
              disabled={isEditDisabled}
              className="textarea"
              name="descriptionContent"
              placeholder="Write your description here...."
              type="text"
              onChange={handleChange}
              defaultValue={currentDescription}
            />
            <button className="descriptionSubmit" type="submit">
              Submit change
            </button>
          </form>{" "}
        </>
      )}
    </div>
  );
}

export default UserDescription;
