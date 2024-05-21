import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/BurgerMenu.css";

function BurgerMenu() {
  return (
    <Menu>
      <Link to="/main">Matches</Link>
      <Link to="/connections">Connections</Link>
      <Link to="/user">User Profile</Link>
    </Menu>
  );
}

export default BurgerMenu;
