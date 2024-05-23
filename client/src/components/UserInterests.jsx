import { useContext, useEffect } from "react";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";

function UserInterests() {
  const { user, setUser } = useContext(UserContext);
  const [currentUserSkills, setCurrentUserSkills] = useState([]);
  const [skillToDelete, setSkillToDelete] = useState("");
  const [addSkillsButton, setAddSkillsButton] = useState(false);
  const [skillToAdd, setSkillToAdd] = useState("");
  const [skillToAddDescription, setSkillToAddDescription] = useState("");
  console.log(user);
  console.log(currentUserSkills);

  useEffect(() => {
    async function getUserSkills() {
      let { data, error } = await supabase.rpc("get_user_skills", {
        userid: user.user_id,
      });
      setCurrentUserSkills(data);
      console.log(currentUserSkills);
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
    console.log(skillToAddDescription);
  };

  const handleAddSkillButton = () => {
    setAddSkillsButton(!addSkillsButton);
  };

  const handleOnSubmitNewSkill = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.rpc("get_skills");
    console.log(data);
    const checkIfSkillExists = data.some((skill) => {
      console.log(skill.skill_name);
      console.log(skillToAdd);
      return skill.skill_name === skillToAdd;
    });

    if (checkIfSkillExists) {
      console.log("Skill already exists");
    } else {
      console.log("Skill does not exist");
    }

    // let { data, error } = await supabase.rpc("post_skill", {
    //   description: skillToAddDescription,
    //   skillname: skillToAdd,
    // });

    // setCurrentUserSkills([...currentUserSkills, skillToAdd]);

    // let { userSkillData, userSkillError } = await supabase.rpc(
    //   "post_user_skill",
    //   {
    //     skill_id,
    //     user_id,
    //   }
    // );
    // if (error) console.error(error);
    // else console.log(data);

    // if (error) console.error(error);
    // else console.log(data);
  };

  useEffect(() => {}, [currentUserSkills]);

  return (
    <div>
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
