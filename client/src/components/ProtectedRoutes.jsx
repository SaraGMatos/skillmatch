import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import supabase from "../../config/config_file";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useContext(UserContext);

  console.log(user);
  return user.user_id ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
