import Axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messages, SetMessages] = useState();
  useEffect(() => {
    Axios.get("https://localhost:7081/api/Message/" + room).then((response) => {
      setMessageList(response.data);
      console.log(response.data);
    });
  }, [room]);
  const sendMessage = async () => {
    console.log(currentMessage);
    if (currentMessage !== "") {
      const messageData = {
        message: {
          room: room,
          user: username,
          messageContent: currentMessage,
          type: "TextMessage",
          new: 0,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        },
        video: {
          paths: "",
          thumbnail: "",
        },
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      Axios.post("https://localhost:7081/api/Message", {
        userid: messageData.message.user,
        chatID: messageData.message.room,
        messageContent: currentMessage,
        type: "TextMessage",
        time: messageData.message.time,
        new: 0,
      });
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("send_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    console.log(messageList);
    SetMessages(
      messageList.map((message, index) => {
        if (message.message.userid === username) {
          setFlex("flex justify-start");
        } else {
          setFlex("flex justify-end");
        }
        if (message.message.type === "TextMessage") {
          console.log(message.message);
          return (
            <ScrollToBottom>
              <div>
                <div className=" h-auto p-2 flex ">
                  <div className="h-auto w-auto max-w-[50%] min-h-[40px] min-w-[120px] bg-slate-900 rounded text-white flex items-center mr-[5px] ml-[5px] pr-[5px] pl-[5px] break-words">
                    {message.message.messageContent}
                  </div>
                </div>
              </div>
            </ScrollToBottom>
          );
        }
        if (message.message.type === "Video") {
          console.log(message.message);
          return (
            <ScrollToBottom>
              <div className=" h-auto p-2 flex">
                <div className="h-auto w-auto min-h-[40px] min-w-[120px] bg-slate-900 rounded text-white flex items-center mr-[5px] ml-[5px] pr-[5px] pl-[5px] break-words">
                  {message.video && (
                    <video
                      muted
                      className="object-cover object-center h-[250px] w-[250px]"
                      controls
                      disablePictureInPicture
                      controlsList="nodownload"
                      id="video"
                      preload="auto"
                      poster={message.video.thumbnail}
                      src={message.video.paths}
                      type="video/mp4"
                    >
                      Video is not supported
                    </video>
                  )}
                  <br />
                </div>
              </div>
            </ScrollToBottom>
          );
        }
      })
    );
  }, [messageList]);

  return (
    <div>
      {/* <div>Chat</div> */}
      <div>
        <div className="h-[600px] w-[820px]">
          {/* <div className="h-[45px] border-r-[6px] relative cursor-pointer">
            Chat header
          </div> */}
          {room}
          <div className="h-[450px] border bg-slate-500 overflow-y-auto">
            <ScrollToBottom className=" w-[100%] h-[100%] overflow-y-hidden overflow-x-hidden">
              {messages}
            </ScrollToBottom>
          </div>
          <input
            className="w-[500px]"
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            type="text"
            placeholder="Type something"
            value={currentMessage}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Chat;
