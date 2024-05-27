import { useEffect } from "react";
import supabase from "../../config/config_file";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../styles/UserPage.css";

function UserIntroSkills({ userProfile }) {
  const { user } = useContext(UserContext);
  const isLoggedUser = userProfile.user_id === user.user_id;
  const [currentUserSkills, setCurrentUserSkills] = useState([]);
  const [addSkillsButton, setAddSkillsButton] = useState(false);
  const [skillToAdd, setSkillToAdd] = useState("");
  const [skillToAddDescription, setSkillToAddDescription] = useState("");
  const [allSkills, setAllSkills] = useState([]);

  const [existingSkillsToAdd, setExistingSkillsToAdd] = useState("");

  useEffect(() => {
    function getUserSkills() {
      return supabase.rpc("get_user_skills", {
        userid: userProfile.user_id,
      });
    }

    function getAllSKills() {
      return supabase.rpc("get_skills");
    }

    getUserSkills().then(({ data }) => {
      setCurrentUserSkills(data);
    });

    getAllSKills().then(({ data }) => {
      setAllSkills(data);
    });
  }, [allSkills]);

  async function handleOnDelete(index, skill_id) {
    setCurrentUserSkills(currentUserSkills.filter((_, i) => i !== index));

    let { data, error } = await supabase.rpc("delete_user_skill", {
      skill_id: skill_id,
      user_id: userProfile.user_id,
    });
  }

  const handleOnChangeNewSkill = (e) => {
    setSkillToAdd(e.target.value);
  };

  const handleOnChangeNewSkillDescription = (e) => {
    setSkillToAddDescription(e.target.value);
  };

  const handleOnChangeExistingSkill = (e) => {
    setExistingSkillsToAdd(e.target.value);
  };

  const handleAddSkillButton = () => {
    setAddSkillsButton(!addSkillsButton);
  };

  const handleOnSubmitNewSkill = async (e) => {
    e.preventDefault();

    const addNewSkills = async () => {
      let { data, error } = await supabase.rpc("post_skill", {
        description: skillToAddDescription,
        skillname: skillToAdd,
      });
    };
    addNewSkills();
    setSkillToAddDescription("");
    setSkillToAdd("");
  };

  const handleSubmitExisitngSkill = async (e) => {
    e.preventDefault();

    const skillId = allSkills.filter(
      (skill) => skill.skill_name === existingSkillsToAdd
    );

    const newSkillId = skillId[0].skill_id;

    const postExistingSkill = async () => {
      let { data, error } = await supabase.rpc("post_user_skill", {
        skill_id: newSkillId,
        user_id: userProfile.user_id,
      });

      setCurrentUserSkills([
        { skill_name: existingSkillsToAdd },
        ...currentUserSkills,
      ]);
    };
    postExistingSkill();
  };
  return (
    <div className="user_skills_container">
      {/* lists of skills */}
      {currentUserSkills.map((skill, index) => {
        userProfile.user_id;
        return (
          <ul
            key={currentUserSkills.skill_id}
            className="user_skills_list_container"
          >
            <li className="user_skills_list_item">
              <p>{skill.skill_name}</p>
              {isLoggedUser && (
                <button
                  value={skill.skill_id}
                  onClick={() => handleOnDelete(index, skill.skill_id)}
                >
                  <img
                    className="user_skills_list_delete_button"
                    src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                    alt=""
                  />
                </button>
              )}
            </li>
          </ul>
        );
      })}
      {isLoggedUser && (
        <button
          onClick={handleAddSkillButton}
          className="add_existing_skills_button"
        >
          add new skills
        </button>
      )}
      {/* form with dropdown menu */}
      {addSkillsButton ? (
        <form
          onSubmit={handleSubmitExisitngSkill}
          className="add_existing_skills_form"
        >
          <label>Pick your skills </label>
          <select onChange={handleOnChangeExistingSkill}>
            <option>skill</option>
            {allSkills.map((skill) => {
              return (
                <option value={skill.skill_name}>{skill.skill_name}</option>
              );
            })}
          </select>

          <input
            type="submit"
            value="Submit"
            className="add_new_skills_button"
          />
        </form>
      ) : (
        ""
      )}
      {/* additional skills to add */}

      {addSkillsButton ? (
        <form onSubmit={handleOnSubmitNewSkill} className="add_new_skills_form">
          <label htmlFor="">or add new skill</label>
          <input
            type="text"
            value={skillToAdd}
            onChange={handleOnChangeNewSkill}
            placeholder="name of your skills"
          />
          <label htmlFor=""></label>
          <textarea
            type="text"
            value={skillToAddDescription}
            onChange={handleOnChangeNewSkillDescription}
            placeholder="describe your skills"
          />
          <button type="submit" className="add_new_skills_button">
            add your skills
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserIntroSkills;
