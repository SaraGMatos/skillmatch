import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../config/config_file";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      navigate("/main");
    }
  }, [session, navigate]);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        localization={{
          variables: {
            sign_in: {
              email_label: "Email address",
              password_label: "Password",
            },
          },
        }}
        appearance={{
          theme: ThemeSupa,
          style: {
            container: {
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignContent: "center",
              width: "100%",
            },
            input: {
              width: "65%",
              border: "solid white",
              borderRadius: "10px",
              backgroundColor: "#dfc9bf",
            },
            label: { alignSelf: "center", color: "#3b3b3b", fontSize: "1.2em" },
            button: {
              width: "40%",
              alignSelf: "center",
              backgroundColor: "#e39b7d",
              border: "2px white",
              borderRadius: "10px",
            },
          },
        }}
        providers={[]}
      />
    );
  }
}

export default LoginPage;
