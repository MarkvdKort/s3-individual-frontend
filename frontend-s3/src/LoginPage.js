import React from "react";
import logo from "./assets/patbev.png"
import LoginButton from "./LoginButton";
import "./Styles/LoginPage.css"
const LoginPage = () => {
    return ( 

          <div className="LoginPage">
            <div className="Logo">
                <img style={{height: "400px", width: "400px"}} src={logo} />
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