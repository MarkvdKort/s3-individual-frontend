import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Navbar from "./Navbar";
import "./index.css";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="bg-black m-0 p-0 h-screen w-screen">
        <Navbar />
        <img src={user.picture} alt={user.name} />
        <h2 className="text-white">{user.name}</h2>
        <p className="text-white">{user.sub}</p>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;
