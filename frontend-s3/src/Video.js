import React, { useEffect, useState } from "react";
import video from "./assets/Tmac13In35.mp4";
import Navbar from "./Navbar";
import Axios from "axios";
import { useParams } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import ReactPlayer from "react-player/lazy";
import logo from "./assets/patbev.png";
const Video = () => {
  const { user } = useAuth0();
  const [userid, setuserid] = useState();
  const [List, setlist] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video").then((response) => {
      setlist(response.data);
    });
  }, []);
  async function GetUserID() {
    try {
      const result = await Axios.get(
        "https://localhost:7081/authid/" + user.sub
      );
      setuserid(result.data);
      
    } catch (Error) {
      console.error(Error);
    }
  }
  GetUserID();

  function AddCurrentlyWatching() {
    Axios.get(
      "https://localhost:7081/api/CurrentlyWatching/" + userid + " 1"
    ).then((response) => {
      if (response.data === "") {
        Axios.post("https://localhost:7081/api/CurrentlyWatching", {
          userID: userid,
          videoID: "1",
        });
      } else {
        console.log(response.data);
      }
    });
  }

  function AddToViewHistory() {
    Axios.delete(
      "https://localhost:7081/api/CurrentlyWatching/" + userid + " 1"
    );
    Axios.get("https://localhost:7081/api/ViewHistory/" + userid + " 1").then(
      (response) => {
        if (response.data === "") {
          Axios.post("https://localhost:7081/api/ViewHistory", {
            userID: userid,
            videoID: "1",
          });
        }
      }
    );
  }

  return (
    
    <div>
      <Navbar />
      {/* {List &&
        List.map(function (item, i) {
          console.log(video);
          return (
            <img
              height="170px"
              width="170px"
              src={item.thumbnail}
              onClick={() => console.log(item.id)}
            ></img>
          );
        })} */}
      {List && (
        <video
          style={{ alignItems: "Center" }}
          muted
          height="600px"
          width="600px"
          controls
          disablePictureInPicture
          controlsList="nodownload"
          id="video"
          preload="auto"
          onClick={() => {console.log(List[0].paths)}}
          poster={List[id -1].thumbnail}
          src={List[id -1].paths}
          type="video/mp4"
          onEnded={() => {
            AddToViewHistory();
          }}
          onPlaying={() => {
            AddCurrentlyWatching();
            //  GetVideos();
          }}
        >
          Video is not supported
        </video>
      )}
    </div>
  );
};
export default Video;
