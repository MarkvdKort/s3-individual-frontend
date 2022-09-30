import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Navbar from "./Navbar"
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (

    isAuthenticated && (
      <div>
            <Navbar />
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>  
        <p>{user.sub}</p>   
        <LogoutButton />
      </div>
    ) 
  );
};

export default Profile;