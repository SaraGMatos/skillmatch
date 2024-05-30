import FilterOptions from "./FilterOptions";
import MatchList from "./MatchList";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/config_file";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../styles/Main.css";

function MainPage() {
  const { setUser } = useContext(UserContext);
  const [currentSortBy, setCurrentSortBy] = useState("");
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
          username: `default_username${Math.floor(Math.random() * 1000 + 1)}`,
          description:
            "Please complete your profile to be able to match and connect with people!",
          avatarurl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKsNmCFrzGx_4sCjsUxR-YXkEKn1WylKpxzoYrtDKN2Knc3y6EGSUckAkUm3O4f6ORnLs&usqp=CAU",
        });
        setUser(data);
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
      <FilterOptions setCurrentSortBy={setCurrentSortBy} />
      <MatchList currentSortBy={currentSortBy} />
    </>
  );
}

export default MainPage;
