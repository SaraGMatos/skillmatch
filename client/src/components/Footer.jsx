import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isSignedIn = location.pathname !== "/";

  return (
    <>
      {isSignedIn && (
        <div>
          <Link to="/main">
            <button>Home</button>
          </Link>
          <Link to="/connections">
            <button>Connections</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Footer;
