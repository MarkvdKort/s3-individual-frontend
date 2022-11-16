import { data } from 'autoprefixer';
import Axios  from 'axios';
import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [Video, setVideo] = useState(null);
    const [messages, SetMessages] = useState();
    useEffect(() => {
        Axios.get("https://localhost:7081/api/Message/" + room).then((response) => {
             setMessageList(response.data);
            
        })
    }, [room])
    const sendMessage = async () => {
        console.log(currentMessage);
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                user: username,
                messageContent: currentMessage,
                type:"TextMessage",
                new: 0,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData]);
            Axios.post("https://localhost:7081/api/Message", {
                userid: messageData.user,
                chatID: messageData.room,
                messageContent: currentMessage,
                type:"TextMessage",
                time: messageData.time,
                new: 0,
              });
            setCurrentMessage("");
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
        socket.on("send_message", (data) => {
            setMessageList((list) => [...list, data]);
        })
    }, [socket])

    useEffect(() => {
        SetMessages(messageList.map((message) => {
            if(message.type === "TextMessage"){
                return <div>{message.messageContent} <br /></div>
            }
            if(message.type === "Video"){
                Axios.get("https://localhost:7081/api/Video/" + message.messageContent).then((response) => {
                    setVideo(response.data);
                  });
                  return <div>
                  {Video && 
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
                
                }
                {!Video && 
                <div>
                    Video can not be found!
                    </div>}
                    </div>
            }
    
        }))
    }, [messageList])

  return (
    <div>
    <div>Chat</div>
    <div>
        <input onKeyPress={(event) => {event.key === "Enter" && sendMessage();}} 
        onChange={(event) => {setCurrentMessage(event.target.value)}} 
        type="text" placeholder="Type something"
        value={currentMessage}>      
        </input>
        <button onClick={sendMessage}>&#9658;</button>
        <div>
            {messages}
        </div>
    </div>
</div>
  )
}

export default Chat