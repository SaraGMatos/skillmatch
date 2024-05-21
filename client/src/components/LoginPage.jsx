import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../config/config_file";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

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

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !isNavigating) {
        setIsNavigating(true);
        navigate("/main");
      }
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [isNavigating, navigate]);

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
