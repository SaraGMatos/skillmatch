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
              src="https://previews.dropbox.com/p/thumb/ACQVBMX2n7LgyBd1an-oOoX48R3B_qd1JRBb29bzQ85s5Vpqt4iYVv-He-Ox1wSXJyoJJaPEEf7aF9uhMVpiqhSU7f8gQlbxEV8IOiLFIEe1qkmI_nGoP3nBvddiItl0YJHQgf2LO5nesDbRcOFvMv2aJgl78pLys5DDpH0Ej16UMVgo0dfAwDYPxlVqyooB-s5n82JjVVcYFDYhb1C83SJqOF0OYZHqWgdlTGt1AP2dKCGDFx7kfl7wVow_5exJnIZAoEMLa5YWVTlXaVmGyuK35A4VHwZdYLe_EvpMMJMucBU9T8QHljCVhnVg5A9_ox8S_6tykod0eu0qVyruF8K0/p.png"
              alt=""
            />
          </div>
          <UserDropdown />
        </div>
      ) : (
        <div className="headerImage">
          <img
            src="https://previews.dropbox.com/p/thumb/ACQVBMX2n7LgyBd1an-oOoX48R3B_qd1JRBb29bzQ85s5Vpqt4iYVv-He-Ox1wSXJyoJJaPEEf7aF9uhMVpiqhSU7f8gQlbxEV8IOiLFIEe1qkmI_nGoP3nBvddiItl0YJHQgf2LO5nesDbRcOFvMv2aJgl78pLys5DDpH0Ej16UMVgo0dfAwDYPxlVqyooB-s5n82JjVVcYFDYhb1C83SJqOF0OYZHqWgdlTGt1AP2dKCGDFx7kfl7wVow_5exJnIZAoEMLa5YWVTlXaVmGyuK35A4VHwZdYLe_EvpMMJMucBU9T8QHljCVhnVg5A9_ox8S_6tykod0eu0qVyruF8K0/p.png"
            alt=""
          />
        </div>
      )}
    </nav>
  );
}

export default Header;
