import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function Room() {
    const [userid, setuserid] = useState("1");
    const [room , setRoom] = useState("12");

    const joinRoom = () => {
        if(userid !== "" && room !== ""){
            socket.emit("join_room", room);
        }
    }
  return (
    <div>
      <input type="text" onChange={(event) => {setuserid(event.target.value)}}></input>
    <button onClick={joinRoom}>join room</button>
    <Chat socket={socket} room={room} username={userid} />
    </div>

  )
}

export default Room