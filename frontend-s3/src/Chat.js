import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        console.log(currentMessage);
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                user: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData]);
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
    <div></div>
    <div>
        <input onKeyPress={(event) => {event.key === "Enter" && sendMessage();}} 
        onChange={(event) => {setCurrentMessage(event.target.value)}} 
        type="text" placeholder="Type something"
        value={currentMessage}>      
        </input>
        <button onClick={sendMessage}>&#9658;</button>
        <div>
            {messageList.map((message) => {
                return <div>{message.message} <br /></div>
            })}
        </div>
    </div>
</div>
  )
}

export default Chat