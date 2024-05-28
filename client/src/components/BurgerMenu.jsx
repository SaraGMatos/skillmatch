import { Link } from "react-router-dom";
import "../styles/NewBurgerMenu.css";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function BurgerMenu() {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="main-container">
      <button onClick={()=>{ setShowMenu(!showMenu) }}><img src="https://i.ibb.co/xz2d2KY/hamburger-button-drop-down-list-computer-icons-navigation-bars-and-page-menu-templates-361b393044224.png"></img></button>
      { showMenu ? <div className="show-menu">
        <Link to="/main" className="menu-item" onClick={()=>{ setShowMenu(!showMenu)}}>Matches</Link>
        <Link to="/connections" className="menu-item" onClick={()=>{ setShowMenu(!showMenu)}}>Connections</Link>
        <Link to={`/user/${user.user_id}`} className="menu-item" onClick={()=>{ setShowMenu(!showMenu)}}>My Profile</Link>
      </div> : null}
    </div>
  );
}

export default BurgerMenu;
