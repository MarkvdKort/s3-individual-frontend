import React, { useEffect, useState } from "react";
import * as Videos from "./assets/index";
import Navbar from "./Navbar";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
      "https://localhost:7081/api/CurrentlyWatching/" + userid +" "+ id
    ).then((response) => {
      if (response.data === "") {
        Axios.post("https://localhost:7081/api/CurrentlyWatching", {
          userID: userid,
          videoID: id,
        });
      } else {
        console.log(response.data);
      }
    });
  }

  function AddToViewHistory() {
    Axios.delete(
      "https://localhost:7081/api/CurrentlyWatching/" + userid +" "+ id
    );
    Axios.get("https://localhost:7081/api/ViewHistory/" + userid +" "+ id).then(
      (response) => {
        if (response.data === "") {
          Axios.post("https://localhost:7081/api/ViewHistory", {
            userID: userid,
            videoID: id,
          });
        }
      }
    );
  }

  return (
    <div>
      <Navbar />
      {List && (
        <video
          style={{ alignItems: "Center" }}
          muted
          className="Video"
          height="400px"
          width="600px"
          controls
          disablePictureInPicture
          controlsList="nodownload"
          id="video"
          preload="auto"
          poster={List[id - 1].thumbnail}
          src={List[id - 1].paths}
          type="video/mp4"
          onEnded={() => {
            AddToViewHistory();
          }}
          onPlaying={() => {
            AddCurrentlyWatching();
          }}
        >
          Video is not supported
        </video>
      )}
    </div>
  );
};
export default Video;
