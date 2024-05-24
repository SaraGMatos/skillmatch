import { useEffect } from "react";
import supabase from "../../config/config_file";
import { useState } from "react";

function UserInterests({ userProfile }) {
  const [currentUserSkills, setCurrentUserSkills] = useState([]);
  const [addSkillsButton, setAddSkillsButton] = useState(false);
  const [skillToAdd, setSkillToAdd] = useState("");
  const [skillToAddDescription, setSkillToAddDescription] = useState("");

  useEffect(() => {
    async function getUserSkills() {
      let { data, error } = await supabase.rpc("get_user_skills", {
        userid: userProfile.user_id,
      });
      setCurrentUserSkills(data);
    }
    getUserSkills();
  }, []);

  async function handleOnDelete(index, skill_id) {
    setCurrentUserSkills(currentUserSkills.filter((_, i) => i !== index));
    let { data, error } = await supabase.rpc("delete_skill", {
      skillid: skill_id,
    });
  }

  const handleOnChangeNewSkill = (e) => {
    setSkillToAdd(e.target.value);
  };

  const handleOnChangeNewSkillDescription = (e) => {
    setSkillToAddDescription(e.target.value);
  };

  const handleAddSkillButton = () => {
    setAddSkillsButton(!addSkillsButton);
  };

  const handleOnSubmitNewSkill = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.rpc("get_skills");

    const checkIfSkillExists = data.some((skill) => {
      return skill.skill_name === skillToAdd;
    });

    if (checkIfSkillExists) {
      console.log("Skill already exists");
    } else {
      console.log("Skill does not exist");
    }
  };

  useEffect(() => {}, [currentUserSkills]);

  return (
    <div>
      {currentUserSkills.map((skill, index) => {
        userProfile.user_id;
        return (
          <ul key={currentUserSkills.skill_id}>
            <li>
              <p>{skill.skill_name}</p>
              <button
                value={skill.skill_id}
                onClick={() => handleOnDelete(index, skill.skill_id)}
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
      <button onClick={handleAddSkillButton}>add skills</button>
      {addSkillsButton ? (
        <form onSubmit={handleOnSubmitNewSkill}>
          <label htmlFor=""></label>
          <input
            type="text"
            value={skillToAdd}
            onChange={handleOnChangeNewSkill}
          />
          <label htmlFor=""></label>
          <input
            type="text"
            value={skillToAddDescription}
            onChange={handleOnChangeNewSkillDescription}
            placeholder="describe your skills"
          />
          <button type="submit">add your skills</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserInterests;
