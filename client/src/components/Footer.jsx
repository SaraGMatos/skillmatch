import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <Link to="/main">
        <button>Home</button>
      </Link>
      <Link to="/connections">
        <button>Connections</button>
      </Link>
    </div>
  );
}

export default Footer;
