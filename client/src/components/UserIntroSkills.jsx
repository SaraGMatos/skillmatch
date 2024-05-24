import { useContext, useEffect } from "react";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";

function UserIntroSkills() {
  const { user, setUser } = useContext(UserContext);
  const [currentUserSkills, setCurrentUserSkills] = useState([]);
  const [skillToDelete, setSkillToDelete] = useState("");
  const [addSkillsButton, setAddSkillsButton] = useState(false);
  const [skillToAdd, setSkillToAdd] = useState("");
  const [skillToAddDescription, setSkillToAddDescription] = useState("");
  const [skillIDToAdd, setSkillIDToAdd] = useState("");
  const [allSkills, setAllSkills] = useState([]);

  const [existingSkillsToAdd, setExistingSkillsToAdd] = useState("");

  useEffect(() => {
    function getUserSkills() {
      return supabase.rpc("get_user_skills", {
        userid: user.user_id,
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
      user_id: user.user_id,
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
        user_id: user.user_id,
      });

      setCurrentUserSkills([
        { skill_name: existingSkillsToAdd },
        ...currentUserSkills,
      ]);
    };
    postExistingSkill();
  };
  return (
    <div>
      {/* lists of skills */}
      {currentUserSkills.map((skill, index) => {
        user.user_id;
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
      <button onClick={handleAddSkillButton}>add new skills</button>
      {/* form with dropdown menu */}
      {addSkillsButton ? (
        <form onSubmit={handleSubmitExisitngSkill}>
          <label>
            Pick your skills
            <select onChange={handleOnChangeExistingSkill}>
              <option>skill</option>
              {allSkills.map((skill) => {
                return (
                  <option value={skill.skill_name}>{skill.skill_name}</option>
                );
              })}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        ""
      )}
      {/* additional skills to add */}

      {addSkillsButton ? (
        <form onSubmit={handleOnSubmitNewSkill}>
          <label htmlFor="">or add new skill</label>
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

export default UserIntroSkills;
