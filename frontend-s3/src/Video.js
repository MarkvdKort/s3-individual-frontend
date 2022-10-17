import React, { useEffect, useState } from "react";
import * as Videos from "./assets/index";
import Navbar from "./Navbar";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const Video = () => {
  const { user } = useAuth0();
  const [userid, setuserid] = useState();
  const [Video, setVideo] = useState(null);
  const { id } = useParams();
  const [ListButton, setListButton] = useState(null);
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video/" + id).then((response) => {
      setVideo(response.data);
    });
    Axios.get(
      "https://localhost:7081/authid/" + user.sub
    ).then((response) => {
      setuserid(response.data)
    });
  }, [id, user.sub]);
  useEffect(() => {
    Axios.get("https://localhost:7081/api/MyList/" + userid + " " + id)
    .then((response) => {
      if(response.data !== ""){
        setListButton(<button onClick={() => RemoveFromMyList()}>Remove from my list</button>)
      }
      else{
        setListButton(<button onClick={() => AddToMyList()}>Add to my list</button>)
      }
    })
  },[userid])
  function AddCurrentlyWatching() {
    Axios.get(
      "https://localhost:7081/api/CurrentlyWatching/" + userid + " " + id
    ).then((response) => {
      if (response.data === "") {
        Axios.post("https://localhost:7081/api/CurrentlyWatching", {
          userID: userid,
          videoID: id,
        });
      } else {
        console.log(userid);
      }
    });
  }

  function AddToViewHistory() {
    Axios.delete(
      "https://localhost:7081/api/CurrentlyWatching/" + userid + " " + id
    );
    Axios.get(
      "https://localhost:7081/api/ViewHistory/" + userid + " " + id
    ).then((response) => {
      if (response.data === "") {
        Axios.post("https://localhost:7081/api/ViewHistory", {
          userID: userid,
          videoID: id,
        });
      }
    });
  }
  function AddToMyList() {
    axios
      .get("https://localhost:7081/api/MyList/" + userid + " " + id)
      .then((response) => {
        console.log(response.data);
        if (response.data === "") {
          Axios.post("https://localhost:7081/api/MyList", {
            userID: userid,
            videoID: id,
          });
        }
      });
  }
  function RemoveFromMyList() {
    axios
      .get("https://localhost:7081/api/MyList/" + userid + " " + id)
      .then((response) => {
        console.log(response.data);
        if (response.data !== "") {
          Axios.delete(
            "https://localhost:7081/api/MyList/" + userid + " " + id
          );
        }
      });
  }
  return (
    <div>
      <Navbar />
      {Video && (
        <video
          muted
          className="items-center h-[400] w-[600px]"
          controls
          disablePictureInPicture
          controlsList="nodownload"
          id="video"
          preload="auto"
          poster={Video.thumbnail}
          src={Video.paths}
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
      {ListButton}
    </div>
  );
};
export default Video;
