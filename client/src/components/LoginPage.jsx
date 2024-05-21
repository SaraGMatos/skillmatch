import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../config/config_file";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generate } from "random-words";

function LoginPage() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const randomUsername = generate();

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((e) => {
      if (isNavigating) {
        return;
      }
      if (e === "SIGNED_IN") {
        setIsNavigating(true);
        navigate("/main");
      } else if (e === "SIGNED_OUT") {
        setIsNavigating(true);
        navigate("/");
      }
    });

    supabase.auth.getSession().then((data) => {
      async function searchUserByID() {
        const user = await supabase
          .from("Users")
          .select("*")
          .eq("user_id", session.user.id);
        console.log(user.data.length);
        setCurrentUser(user.data.length);
      }
      searchUserByID();

      if (session && !isNavigating) {
        setIsNavigating(true);
        navigate("/main");
      }
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [isNavigating, navigate]);

  console.log(currentUser);
  if (currentUser === 0) {
    async function postUser() {
      await supabase
        .from("Users")
        .insert([{ username: randomUsername }])
        .select();
    }
    postUser();
    // navigate("/user");
  }

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={[]}
      theme="dark"
    />
  );
}

export default LoginPage;
