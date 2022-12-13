import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect } from "react";
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function VideoPreview() {
  const [open, setOpen] = useState(true);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { id } = useParams();
  const { user } = useAuth0();
  const [Video, setVideo] = useState(null);
  const [userid, setuserid] = useState();
  const [ListButton, setListButton] = useState(null);
  const [LikeButton, setLikeButton] = useState(null);
  const [Timestamp, setTimeStamp] = useState(null);
  const [Suggestions, setSuggestions] = useState(null);
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
  }, [userid, Video]);

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
  }, [userid, Video]);
  useEffect(() => {
    Axios.get(
      "https://localhost:7081/api/CurrentlyWatching/" + userid + " " + id
    ).then((response) => {
      if (response.data != "") {
        setTimeStamp(response.data);
      } else {
        setTimeStamp("0");
      }
    });
  }, [userid, Video]);
  useEffect(() => {
    Video &&
      Axios.get(
        "https://localhost:7081/api/Video/Suggested/" +
          Video.player +
          "/" +
          Video.team +
          "/" +
          Video.id
      ).then((response) => {
        if (response.data != "") {
          setSuggestions(response.data);
        }
      });
  }, [Video]);
  // useEffect(() => {
  //   Axios.get("https://localhost:7081/api/Video/Suggested/" + Video.player + "/" + Video.team + "/" + Video.id).then((response) => {
  //       setSuggestions(response.data);
  //       console.log(response.data);
  //   });
  // }, [Video]);

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
    Axios.get("https://localhost:7081/api/MyList/" + userid + " " + id).then(
      (response) => {
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
      }
    );
  }

  function RemoveFromMyList() {
    Axios.get("https://localhost:7081/api/MyList/" + userid + " " + id).then(
      (response) => {
        console.log(response.data);
        if (response.data !== "") {
          Axios.delete(
            "https://localhost:7081/api/MyList/" + userid + " " + id
          );
          setListButton(
            <button onClick={() => AddToMyList()}>Add to my list</button>
          );
        }
      }
    );
  }
  function RemoveLikedVideo() {
    Axios.get("https://localhost:7081/api/Like/" + userid + " " + id).then(
      (response) => {
        console.log(response.data);
        if (response.data !== "") {
          Axios.delete("https://localhost:7081/api/Like/" + userid + " " + id);
          setLikeButton(<button onClick={() => LikeVideo()}>Like</button>);
        }
      }
    );
  }
  function LikeVideo() {
    Axios.get("https://localhost:7081/api/Like/" + userid + " " + id).then(
      (response) => {
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
      }
    );
  }
  var vid = document.getElementById("video");
  function addToCurrentlyWatchingWithTime() {
    if (vid.currentTime != vid.duration && vid.currentTime != 0) {
      Axios.get(
        "https://localhost:7081/api/CurrentlyWatching/" + userid + " " + id
      ).then((response) => {
        if (response.data === "") {
          Axios.post("https://localhost:7081/api/CurrentlyWatching", {
            userID: userid,
            videoID: id,
            timeStamp: vid.currentTime,
          });
        } else {
          Axios.put("https://localhost:7081/api/CurrentlyWatching", {
            userID: userid,
            videoID: id,
            timeStamp: vid.currentTime,
          });
          console.log(vid.currentTime);
        }
      });
    }
  }

  useEffect(() => {
    Axios.get("https://localhost:7081/api/Video/" + id).then((response) => {
      setVideo(response.data);
    });
    Axios.get("https://localhost:7081/authid/" + user.sub).then((response) => {
      setuserid(response.data);
    });
  }, [user.sub]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-slate-900 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <Link
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    to="/"
                    onClick={() => addToCurrentlyWatchingWithTime()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                        {Video && Timestamp && (
                          <video
                            muted
                            className="object-cover object-center"
                            controls
                            disablePictureInPicture
                            controlsList="nodownload"
                            id="video"
                            preload="auto"
                            poster={Video.thumbnail}
                            src={Video.paths + "#t=" + Timestamp.timeStamp}
                            type="video/mp4"
                            onPlaying={() => console.log(Suggestions)}
                            onEnded={() => AddToViewHistory()}
                          >
                            Video is not supported
                          </video>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {Video && Video.name}
                      </h2>
                      <section
                        aria-labelledby="information-heading"
                        className="mt-3"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          {Video && Video.player}
                        </p>

                        <div className="mt-6">
                          <h4 className="sr-only">Description</h4>

                          <p className="text-sm text-gray-700">
                            {Video && Video.description}
                          </p>
                        </div>
                      </section>
                      <section
                        aria-labelledby="options-heading"
                        className="mt-6"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>
                      </section>
                      {LikeButton}
                      {ListButton}
                      <br /> <br /> Suggested Videos <br />
                      {Suggestions &&
                        Suggestions.map(function (item) {
                          return (
                            <Link to={"/preview" + item.id}>
                              <img
                                className="h-100 max-w-100 inline-block px-0.5"
                                src={item.thumbnail}
                                onClick={() =>
                                  Axios.get(
                                    "https://localhost:7081/api/Video/" +
                                      item.id
                                  ).then((response) => {
                                    setVideo(response.data);
                                  })
                                }
                              ></img>
                            </Link>
                          );
                        })}
                      <Link to={"/SharePreview" + id}>Share video</Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
