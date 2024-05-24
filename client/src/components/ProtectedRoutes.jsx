import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../config/config_file";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then((authId) => {
      let userId = "";
      authId.data.user ? (userId = authId.data.user.id) : (userId = "");
      supabase
        .rpc("get_user_by_id", { userid: userId })
        .then((data) => {
          if (data.data) setIsLoggedIn(true);
          //console.log(data.data.user_id);
        })
        .then(() => {
          setIsLoading(false);
        });
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
