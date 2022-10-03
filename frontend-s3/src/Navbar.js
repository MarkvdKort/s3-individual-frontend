import { Link } from "react-router-dom";
import "./Styles/Navbar.css";
import LogoutButton from "./LogoutButton";
const Navbar = () => {
  return (
    <nav className="topnav">
      <Link to="/">HomePage</Link>
      <Link to="/profile">Profile</Link>
      <div style={{ float: "right" }}>
        <LogoutButton />
      </div>
    </nav>
  );
};
export default Navbar;
