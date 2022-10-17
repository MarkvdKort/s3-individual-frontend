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
  const [LikedVideos, setLikedVideos] = useState(null);
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video").then((response) => {
      setVideos(response.data);
    });
    Axios.get("https://localhost:7081/authid/" + user.sub).then((response) => {
      setuserid(response.data);
    });
    if (userid === null) {
      Axios.post("https://localhost:7081/api/User", {
        fullName: user.name,
        authID: user.sub,
      });
    }
  }, []);
  useEffect(() => {
    if (userid != null && userid != undefined) {
      Axios.get("https://localhost:7081/Video/MyList/" + userid).then(
        (response) => {
          setMylist(response.data);
        }
      );
      Axios.get("https://localhost:7081/Video/Liked/" + userid).then(
        (response) => {
          setLikedVideos(response.data);
        }
      );
    }
  }, [userid]);

  return (
    <div className="bg-black m-0 p-0 h-screen w-screen">
      <div>
        <Navbar />
        <div className="Text">
          {Videos &&
            Videos.map(function (item, i) {
              return (
                <Link to={"./Video" + item.id}>
                  <img
                    className="h-170 max-w-170 inline-block px-2.5"
                    src={item.thumbnail}
                    onClick={() => console.log(user.sub)}
                  ></img>
                </Link>
              );
            })}
          <br />
          <div className="text-red-500">My List</div>
          <br />
          {Mylist &&
            Mylist.map(function (item, i) {
              return (
                <Link to={"./Video" + item.id}>
                  <img
                    className="h-170 max-w-170 inline-block"
                    src={item.thumbnail}
                    onClick={() => console.log(item.id)}
                  ></img>
                </Link>
              );
            })}
          <br />
          <div className="text-red-500">Liked Videos</div>
          <br />
          {LikedVideos &&
            LikedVideos.map(function (item, i) {
              return (
                <Link to={"./Video" + item.id}>
                  <img
                    className="h-170 max-w-170 inline-block"
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
