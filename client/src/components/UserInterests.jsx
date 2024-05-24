import { useContext, useEffect } from "react";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";

function UserInterests() {
  const { user, setUser } = useContext(UserContext);
  const [currentUserInterest, setCurrentUserInterest] = useState([]);
  const [interestToDelete, setInterestToDelete] = useState("");
  const [addInterestButton, setAddInterestButton] = useState(false);
  const [interestToAdd, setInterestToAdd] = useState("");
  const [interestToAddDescription, setInterestToAddDescription] = useState("");
  const [interestIDToAdd, setinterestIDToAdd] = useState("");
  const [allInterest, setAllInterest] = useState([]);

  const [existingInterestToAdd, setExistingInterestToAdd] = useState("");

  useEffect(() => {
    function getUserInterest() {
      return supabase.rpc("get_user_interests", {
        userid: user.user_id,
      });
    }

    function getAllInterest() {
      return supabase.rpc("get_skills");
    }

    getUserInterest().then(({ data }) => {
      setCurrentUserInterest(data);
    });

    getAllInterest().then(({ data }) => {
      setAllInterest(data);
    });
  }, [allInterest]);

  async function handleOnDelete(index, skill_id) {
    setCurrentUserInterest(currentUserInterest.filter((_, i) => i !== index));

    let { data, error } = await supabase.rpc("delete_user_interest", {
      skill_id: skill_id,
      user_id: user.user_id,
    });
  }

  const handleOnChangeNewInterest = (e) => {
    setInterestToAdd(e.target.value);
  };

  const handleOnChangeNewInterestDescription = (e) => {
    setInterestToAddDescription(e.target.value);
  };

  const handleOnChangeExistingInterest = (e) => {
    setExistingInterestToAdd(e.target.value);
  };

  const handleAddInterestButton = () => {
    setAddInterestButton(!addInterestButton);
  };

  const handleOnSubmitNewInterest = async (e) => {
    e.preventDefault();

    const addNewInterest = async () => {
      let { data, error } = await supabase.rpc("post_skill", {
        description: interestToAddDescription,
        skillname: interestToAdd,
      });
    };
    addNewInterest();
    setInterestToAddDescription("");
    setInterestToAdd("");
  };

  const handleSubmitExisitngInterest = async (e) => {
    e.preventDefault();

    const interestId = allInterest.filter(
      (interest) => interest.skill_name === existingInterestToAdd
    );

    const newInterestId = interestId[0].skill_id;

    const postExistingInterest = async () => {
      let { data, error } = await supabase.rpc("post_user_interest", {
        skill_id: newInterestId,
        user_id: user.user_id,
      });

      setCurrentUserInterest([
        { skill_name: existingInterestToAdd },
        ...currentUserInterest,
      ]);
    };
    postExistingInterest();
  };
  return (
    <div>
      {/* lists of interests */}
      {currentUserInterest.map((interest, index) => {
        user.user_id;
        return (
          <ul key={currentUserInterest.skill_id}>
            <li>
              <p>{interest.skill_name}</p>
              <button
                value={interest.skill_id}
                onClick={() => handleOnDelete(index, interest.skill_id)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                  alt=""
                />
              </button>
            </li>
          </ul>
        );
      })}
      <button onClick={handleAddInterestButton}>add new interests</button>
      {/* form with dropdown menu */}
      {addInterestButton ? (
        <form onSubmit={handleSubmitExisitngInterest}>
          <label>
            Pick your interests
            <select onChange={handleOnChangeExistingInterest}>
              <option>interest</option>
              {allInterest.map((interest) => {
                return (
                  <option value={interest.skill_name}>
                    {interest.skill_name}
                  </option>
                );
              })}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        ""
      )}
      {/* additional interest to add */}

      {addInterestButton ? (
        <form onSubmit={handleOnSubmitNewInterest}>
          <label htmlFor="">or add new interest</label>
          <input
            type="text"
            value={interestToAdd}
            onChange={handleOnChangeNewInterest}
            placeholder="name of your interest"
          />
          <label htmlFor=""></label>
          <input
            type="text"
            value={interestToAddDescription}
            onChange={handleOnChangeNewInterestDescription}
            placeholder="describe your interest"
          />
          <button type="submit">add your interest</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserInterests;
