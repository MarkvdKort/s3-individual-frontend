import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import io from 'socket.io-client'
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
const socket = io.connect("http://localhost:3001");
function SharePreview() {
    const [open, setOpen] = useState(true);
    const { video } = useParams();
    const { user } = useAuth0();
    const [Video, setVideo] = useState(null);
    const [userid, setuserid] = useState();
    const [chats, setChats] = useState([]);
    useEffect(() => {
      Axios.get("https://localhost:7081/api/Video/" + video).then((response) => {
        setVideo(response.data);
      });
      Axios.get("https://localhost:7081/authid/" + user.sub).then((response) => {
        setuserid(response.data);
      });
    }, [user.sub]);
    const joinRoom = (chat) => {
      if(userid !== "" && chat !== ""){
          socket.emit("join_room", chat);
          console.log("Je bent de chat gejoint")
      }
  }
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Chat/" + userid).then((response) => {
      setChats(response.data);
    });
  }, [userid])
  const SendVideo = async (chat) => {
    joinRoom(chat.id);
    const messageData = {
      message: {
        chatID: chat.id,
        user: userid,
        messageContent: `${Video.id}`,
        type:"Video",
        new: 0,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    },
    video: {
        paths: Video.paths,
        thumbnail: Video.thumbnail
    }
  }
    Axios.post("https://localhost:7081/api/Message", {
      userID: userid,
      chatID: chat.id,
      messageContent: `${Video.id}`,
      type: "Video",
      time: "nu",
      new: 0
    }).then((response) => console.log(response.data));
    await socket.emit("send_message", messageData)
  } 
    const ChatList =  chats.map((chat) => {
      return <Link to={"/preview" + Video.id} onClick={() => {
        SendVideo(chat);
      }} className="p-6 h-50 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      {/* <div className="shrink-0">
        <img className="h-12 w-12" src="/img/logo.svg" alt="Logo" />
      </div> */}
      <div>
        <div className="text-xl font-medium text-black">Chat: {chat.id}</div>
          <p className="text-slate-500">{chat.user1id}</p>
        </div>
      </Link>   
       
    })
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
                    // onClick={() => addToCurrentlyWatchingWithTime()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                         {Video && (
                          <video
                            muted
                            className="object-cover object-center"
                            controls
                            disablePictureInPicture
                            controlsList="nodownload"
                            id="video"
                            preload="auto"
                            poster={Video.thumbnail}
                            src={Video.paths}
                            type="video/mp4"
                          >
                            Video is not supported
                          </video>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        <button onClick={( ) => {console.log(video)}}>
                        SHARE VIDEO
                        </button>
                        
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-3"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          send to:
                        </p>

                        <div className="mt-6">
                          <h4 className="sr-only">Description</h4>

                          {/* <p className="text-sm text-gray-700"> */}
                            {ChatList}
                          {/* </p> */}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SharePreview