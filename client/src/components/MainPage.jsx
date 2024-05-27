import FilterOptions from "./FilterOptions";
import MatchList from "./MatchList";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/config_file";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LearningList from "./LearningList";

function MainPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const authId = await supabase.auth.getUser();

      const userId = authId.data.user.id;

      let { data, error } = await supabase.rpc("get_user_by_id", {
        userid: userId,
      });

      if (!data.user_id) {
        let { data, error } = await supabase.rpc("post_user", {
          userid: userId,
        });
        setUser(data);
        navigate("/user");
        if (error) {
          console.error(error);
        }
      } else {
        setUser(data);
        console.log("This user already exists");
      }
      if (error) {
        console.log(error.code);
      }
    }
    getUserData();
  }, [navigate]);

  return (
    <>
      <FilterOptions className="filter-options-container" />
      <MatchList />
    </>
  );
}

export default MainPage;
