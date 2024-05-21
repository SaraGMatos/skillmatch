import BurgerMenu from "./BurgerMenu";
import UserDropdown from "./UserDropdown";
import { useLocation } from "react-router-dom";

function Header() {
  let location = useLocation();
  let isSignedIn = location.pathname !== "/";
  // if (location.pathname !== "/")
  return (
    <>
      <h1>SkillMatch</h1>
      {isSignedIn && (
        <>
          <BurgerMenu /> <UserDropdown />
        </>
      )}
    </>
  );
}

export default Header;
