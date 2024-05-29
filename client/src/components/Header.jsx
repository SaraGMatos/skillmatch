import BurgerMenu from "./BurgerMenu";
import UserDropdown from "./UserDropdown";
import { useLocation } from "react-router-dom";
import "../styles/App.css";
import { UserContext } from "../contexts/UserContext";
function Header() {
  const location = useLocation();
  const isSignedIn = location.pathname !== "/";

  return (
    <nav className="navbar">
      {isSignedIn ? (
        <div className="headerLogged">
          <BurgerMenu />
          <div className="headerImage">
            <img
              src="https://i.postimg.cc/15PhMFRm/skillmatch-nobckg.png"
              alt=""
            />
          </div>
          <UserDropdown />
        </div>
      ) : (
        <div className="headerImage">
          <img
            src="https://i.postimg.cc/15PhMFRm/skillmatch-nobckg.png"
            alt=""
          />
        </div>
      )}
    </nav>
  );
}

export default Header;
