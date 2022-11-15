import Axios  from 'axios';
import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
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
            setMessageList((list) => [...list, data])
        })
    }, [socket])
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
            {messageList.map((message) => {
                return <div>{message.messageContent} <br /></div>
            })}
        </div>
    </div>
</div>
  )
}

export default Chat