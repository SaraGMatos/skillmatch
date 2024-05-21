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
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
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
