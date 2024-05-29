import "../styles/showcase.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";

function UserShowcase({ userProfile }) {
  const { user } = useContext(UserContext);
  const [newShowcase, setNewShowcase] = useState("");
  const [currentShowcase, setCurrentShowcase] = useState(userProfile.showcase);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
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
  };

  const handleChange = (e) => {
    setNewShowcase(e.target.value);
  };

  return (
    <div className="showcase-container">
      <section>{currentShowcase}</section>
      {isLoggedUser && (
        <>
          <button
            className='edit_button'
            onClick={() => {
              if (isEditDisabled) {
                setIsEditDisabled(false);
                setIsHidden(false);
              } else {
                setIsEditDisabled(true);
                setIsHidden(true);
              }
            }}
          >
            Edit your showcase
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
            <button className="edit_button" type="submit">
              Submit change
            </button>
          </form>{" "}
        </>
      )}
    </div>
  );
}

export default UserShowcase;
