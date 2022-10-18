import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return ( 

          
    <button className="text-red-500" onClick={() => loginWithRedirect()}>
        Log In 
    </button>

     );
}
 
export default LoginButton;