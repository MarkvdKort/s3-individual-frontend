import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div>
    <button className="LoginButton" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
    </div>
  );
};

export default LogoutButton;