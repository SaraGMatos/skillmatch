import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/BurgerMenu.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function BurgerMenu() {
  const { user } = useContext(UserContext);
  return (
    <Menu>
      <Link to="/main">Matches</Link>
      <Link to="/connections">Connections</Link>
      <Link to={`/user/${user.user_id}`}>My Profile</Link>
    </Menu>
  );
}

export default BurgerMenu;
