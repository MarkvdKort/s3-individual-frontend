import React, { useEffect, useState } from "react";
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
  const [LikeButton, setLikeButton] = useState(null);
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video/" + id).then((response) => {
      setVideo(response.data);
    });
    Axios.get("https://localhost:7081/authid/" + user.sub).then((response) => {
      setuserid(response.data);
    });
  }, [id, user.sub]);

  useEffect(() => {
    Axios.get("https://localhost:7081/api/MyList/" + userid + " " + id).then(
      (response) => {
        if (response.data !== "") {
          setListButton(
            <button onClick={() => RemoveFromMyList()}>
              Remove from my list
            </button>
          );
        } else {
          setListButton(
            <button onClick={() => AddToMyList()}>Add to my list</button>
          );
        }
      }
    );
  }, [userid]);

  useEffect(() => {
    Axios.get("https://localhost:7081/api/Like/" + userid + " " + id).then(
      (response) => {
        if (response.data !== "") {
          setLikeButton(
            <button onClick={() => RemoveLikedVideo()}>Remove like</button>
          );
          console.log(response);
        } else {
          setLikeButton(<button onClick={() => LikeVideo()}>Like</button>);
        }
      }
    );
  }, [userid]);

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
          setListButton(
            <button onClick={() => RemoveFromMyList()}>
              Remove from my list
            </button>
          );
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
          setListButton(
            <button onClick={() => AddToMyList()}>Add to my list</button>
          );
        }
      });
  }
  function RemoveLikedVideo() {
    axios
      .get("https://localhost:7081/api/Like/" + userid + " " + id)
      .then((response) => {
        if (response.data !== "") {
          Axios.delete("https://localhost:7081/api/Like/" + userid + " " + id);
          setLikeButton(<button onClick={() => LikeVideo()}>Like</button>);
        }
      });
  }
  function LikeVideo() {
    axios
      .get("https://localhost:7081/api/Like/" + userid + " " + id)
      .then((response) => {
        console.log(response.data);
        if (response.data === "") {
          Axios.post("https://localhost:7081/api/Like/", {
            userid: userid,
            videoid: id,
          });
          setLikeButton(
            <button onClick={() => RemoveLikedVideo()}>
              Remove from Likes
            </button>
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
          className="items-center w-[500px] h-[375px]"
          controls
          disablePictureInPicture
          controlsList="nodownload"
          id="video"
          preload="auto"
          poster={Video.thumbnail}
          src={Video.paths + "#t=13.822835"}
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
      {LikeButton}
    </div>
  );
};
export default Video;
