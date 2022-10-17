import React from "react";
import logo from "./assets/patbev.png"
import LoginButton from "./LoginButton";
const LoginPage = () => {
    return ( 

          <div className="bg-black">
            <div className="Logo">
                <img className="h-[400px] w-[400px]" src={logo} />
            </div>
            <br />
            <div className="Text">
            You aren't logged in yet<br />
            <LoginButton />
            </div>
          </div>


     );
}
 
export default LoginPage;