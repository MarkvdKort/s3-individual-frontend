import React from "react";
import logo from "./assets/patbev.png"
import Navbar from "./Navbar";
import LogoutButton from "./LogoutButton";
const HomePage = () => {
    return ( 

          <div className="LoginPage">
            <Navbar />
            <div className="Logo">
                <img style={{height: "400px", width: "400px"}} src={logo} />
            </div>
            <br />
            <div className="Text">
            You are logged in<br />
            <LogoutButton />
            </div>            
          </div>


     );
}
 
export default HomePage;