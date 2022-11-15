import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';
import Navbar from './Navbar'
import Axios from 'axios' 
import { useAuth0 } from '@auth0/auth0-react';
const socket = io.connect("http://localhost:3001");

function Room() {
  const { user} = useAuth0();
    const [userid, setuserid] = useState("1");
    const [room , setRoom] = useState("12");
    const [chats, setChats] = useState([]);
    const joinRoom = () => {
        if(userid !== "" && room !== ""){
            socket.emit("join_room", room);
        }
    }
    useEffect(() => {
      Axios.get("https://localhost:7081/authid/" + user.sub).then((response) => {
        setuserid(response.data);
      });
    }, [])
    useEffect(() => {
      Axios.get("https://localhost:7081/api/Chat/" + userid).then((response) => {
        setChats(response.data);
      });
    }, [userid])
  return (
    
    <div>
      <Navbar />
           Room:    <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input><br />
      Userid:  <input type="text" onChange={(event) => {setuserid(event.target.value)}}></input>

    <button onClick={joinRoom}>join room</button>
    <Chat socket={socket} room={room} username={userid} />
    <button onClick={() => console.log(chats)}>click here</button>
    {chats &&
      chats.map((chat) => {
        return <div>
          {chat.id}
          </div>
      })
    }
    </div>

  )
}

export default Room