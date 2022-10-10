import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LogoutButton from "./LogoutButton";
import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Axios from "axios";

const HomePage = () => {
  const { user } = useAuth0();
  const [userid, setuserid] = useState();
  const [Videos, setVideos] = useState(null);
  const [Mylist, setMylist] = useState(null);
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video").then((response) => {
      setVideos(response.data);
    });
  }, []);

  Axios.get("https://localhost:7081/authid/" + user.sub).then((response) => {
    setuserid(response.data);
  });
  if (userid === null) {
    Axios.post("https://localhost:7081/api/User", {
      fullName: user.name,
      authID: user.sub,
    });
  }
  Axios.get("https://localhost:7081/Video/MyList/6").then((response) => {
    setMylist(response.data);
  });
  return (
    <div>
      <div className="LoginPage">
        <Navbar />
        <div className="Text">
          <button
            id="openvideo"
            onClick={async () => {
              const [openvideoHandle] = await window.showOpenFilePicker();
              const file = await openvideoHandle.getFile();
              const content = await file.src();
              console.log(content);
            }}
          >
            Open Video
          </button>
          <button onClick={() => console.log(Mylist)}>view my list</button>
          {Videos &&
            Videos.map(function (item, i) {
              return (
                <Link to={"./Video" + item.id}>
                  <img
                    className="h-[170px] max-w-[170px] inline-block"
                    src={item.thumbnail}
                    onClick={() => console.log(item.id)}
                  ></img>
                </Link>
              );
            })}
          <br />
          My List
          <br />
          {Mylist &&
            Mylist.map(function (item, i) {
              return (
                <Link to={"./Video" + item.id}>
                  <img
                    className="h-[170px] max-w-[170px] inline-block"
                    src={item.thumbnail}
                    onClick={() => console.log(item.id)}
                  ></img>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
