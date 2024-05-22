import FilterOptions from "./FilterOptions";
import MatchList from "./MatchList";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/config_file";
import { useState, useEffect } from "react";

function MainPage() {
  const [user, setUser] = useState("");
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
        navigate("/user");
        if (error) {
          console.error(error);
        }
      } else {
        console.log("This user already exists");
      }
      if (error) {
        console.log(error.code);
      }
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <>
      <button
        onClick={() => {
          signOutUser();
        }}
      >
        Sign Out
      </button>
      <FilterOptions />
      <MatchList />
    </>
  );
}

export default MainPage;
