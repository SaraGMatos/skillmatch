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
                src="https://previews.dropbox.com/p/thumb/ACTGMCko5la_PUXOie_bVCUox18HsN1ITNFRxl0DjZVCWjN4IKerV8Af7234uKmrECig0PMxqvu6ijxuKgij3nW6IMkT89N3Pz3uRvFThj1HzpMgU7ML9qy_xbw9SMtv8ksk4iF1z3hz7Ic44_OWFKzOz-U7XxfSYBNO2WSRBvgXwcoFeuMKMUEfVu1AP5IyLO5JvxHR5EaOCmQgKtCnJ4UvnCU9xmx55YkNKd0hiIwFQevWoenI1e9Vckf5Xl4YW5pCePDiFjXf_QP7Y8nwSwijCVx0m3GtttbbUlnuzc2nHq2xS7o8n7OuNbAikQN1lJWeThEi-6-vF_PqgQYWGvdO/p.png"
                alt=""
              />
            </button>
          </Link>
          <Link to="/connections">
            <button className="connection_button">
              <img
                src="https://previews.dropbox.com/p/thumb/ACTTIUj8OSBLhk6tjPK3B5VIlnyvRh2BQoOQ0LKRefMMvnSF5_51Gaqlk5OyeIHZBizxbGQ2hbZi060E7YWofXHnGdkzE8fYVGXE-_77wFWSl9vgLZ093uuUgklzJWEndCEtocbjjUTHHtHH66Wye901ZuRNfUP8DGt4B78oSU9uG-sWsQ0zrZq80MUXIQlsEUqLxkZcIhyZOe7x3mkVGtJMa_5uLJo3dKTsyV2m-EZR3lrPiSU95_obM0GeWMo0vu62rbm24HoxN0T0niFp6eJjSAYRmuJPL_dadBj2dG4FFnEsSI89AJUfz70s-rciKXIFwN5TW2gtHlyBGhUc6fB4/p.png"
                alt=""
              />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Footer;
