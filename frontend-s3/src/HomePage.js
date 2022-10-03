import React, { useEffect, useState } from "react";
import logo from "./assets/patbev.png"
import Navbar from "./Navbar";
import LogoutButton from "./LogoutButton";
import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Axios from 'axios';
const HomePage = () => {
  const {user} = useAuth0();
  const [userid, setuserid] = useState();
  const [Videos, setVideos] = useState(null);
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video").then((response) => {
      setVideos(response.data);
    });
  }, []);

  Axios.get('https://localhost:7081/authid/' + user.sub).then((response) => {setuserid(response.data)});
  if(userid === null){
    Axios.post('https://localhost:7081/api/User', {
      fullName: (user.name),
      authID : (user.sub)
    })
  }
    return ( 
          <div>
          <div className="LoginPage">
            <Navbar />
            <div className="Logo">
                <img style={{height: "400px", width: "400px"}} onClick={console.log(Videos)} src={logo} />
            </div>
            <br />
            <div className="Text">
      {Videos &&
        Videos.map(function (item, i) {
          console.log(item);
          return (
            <Link to={"./Video" + item.id }>
            <img
            className="Thumbnail"
              height="170px"
              width="170px"
              src={item.thumbnail}
              onClick={() => console.log(item.id)}
            ></img></Link> 
          );
        })}
            </div>            
          </div>
          </div>

     );
}
 
export default HomePage;