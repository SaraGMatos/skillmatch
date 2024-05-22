import BurgerMenu from "./BurgerMenu";
import UserDropdown from "./UserDropdown";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isSignedIn = location.pathname !== "/";
  return (
    <>
      <h1 style={{ textAlign: "center" }}>SkillMatch</h1>
      {isSignedIn && (
        <>
          <BurgerMenu />
          <UserDropdown />
        </>
      )}
    </>
  );
}

export default Header;
