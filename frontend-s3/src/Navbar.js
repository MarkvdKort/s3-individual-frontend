import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import React from "react";
const Navbar = () => {
  return (
    <nav className="overflow-hidden	bg-b-100">
      <Link to="/" className="text-white text-xl px-1.5 py-1.5 text-center">
        HomePage
      </Link>
      <Link
        to="/profile"
        className="text-white text-xl px-1.5 py-1.5 text-center"
      >
        Profile
      </Link>
      <Link to="/chat" className="text-white text-xl px-1.5 py-1.5 text-center">
        Chat
      </Link>
      <div className="text-red-500 float-right text-xl">
        <LogoutButton />
      </div>
    </nav>
  );
};
export default Navbar;
