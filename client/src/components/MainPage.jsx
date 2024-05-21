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
      const authId = await supabase.auth.getUser(); /*.then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });*/
      const userData = authId.data.user.id;
      console.log(userData);
      let { data, error } = await supabase.rpc("get_user_by_id", userData);
      if (error) console.error(error);
      else console.log(data);
    }
    getUserData();

    //   async function postUser() {
    //     await supabase
    //       .from("Users")
    //       .insert([{ username: "Sara" }])
    //       .select();
    //   }
    //   postUser();
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
