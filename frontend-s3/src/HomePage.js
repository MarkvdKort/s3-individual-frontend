import React, { useState } from "react";
import logo from "./assets/patbev.png"
import Navbar from "./Navbar";
import LogoutButton from "./LogoutButton";
import { useAuth0, User } from "@auth0/auth0-react";
import Axios from 'axios';
const HomePage = () => {
  const {user} = useAuth0();
  const [userid, setuserid] = useState();
  Axios.get('https://localhost:7081/authid/' + user.sub).then((response) => {setuserid(response.data)});
  if(userid === null){
    Axios.post('https://localhost:7081/api/User', {
      fullName: (user.name),
      authID : (user.sub)
    })
  }
    return ( 

          <div className="LoginPage">
            <Navbar />
            <div className="Logo">
                <img style={{height: "400px", width: "400px"}} src={logo} />
            </div>
            <br />
            <div className="Text">
            You are logged in<br />
            
            {/* <button onClick={() => fetch('https://localhost:7081/api/User', {
              
  method: 'POST',
  body: JSON.stringify(
    {
      
      fullName: (user.name),
      authID : (user.sub)
    }
  ),
  headers: {
    'content-type': 'application/json',    
    
  },
}

).then(() => {console.log('Request is handled')})} >make Request</button> */}

            <LogoutButton />
            </div>            
          </div>


     );
}
 
export default HomePage;