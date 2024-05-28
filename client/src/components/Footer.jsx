import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/App.css";

function Footer() {
  const location = useLocation();
  const isSignedIn = location.pathname !== "/";

  return (
    <div className="footer">
      {isSignedIn && (
        <div className="footer-container">
          <Link to="/main">
            <button>Home</button>
          </Link>
          <Link to="/connections">
            <button>Connections</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Footer;
