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
            <button>
              <img
                className="home_button"
                src="../src/graphics/home.svg"
                alt=""
              />
            </button>
          </Link>
          <Link to="/connections">
            <button className="connection_button">
              <img src="../src/graphics/envelope.svg" alt="" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Footer;
