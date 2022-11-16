import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';
import Navbar from './Navbar'
import Axios from 'axios' 
import { useAuth0 } from '@auth0/auth0-react';
const socket = io.connect("http://localhost:3001");

function Room() {
  const { user} = useAuth0();
    const [userid, setuserid] = useState(null);
    const [room , setRoom] = useState("");
    const [chats, setChats] = useState([]);
    const joinRoom = (chat) => {
        if(userid !== "" && chat !== ""){
            socket.emit("join_room", chat);
            setRoom(chat);
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
    const ChatList = chats.map((chat) => {
      return <button onClick={() => {
        joinRoom(chat.id);
      }} className="p-6 h-50 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      {/* <div className="shrink-0">
        <img className="h-12 w-12" src="/img/logo.svg" alt="Logo" />
      </div> */}
      <div>
        <div className="text-xl font-medium text-black">Chat: {chat.id}</div>
          <p className="text-slate-500">{chat.user1id}</p>
        </div>
      </button>   
       
    })
  return (
    
    <div>
      <Navbar />
      <div className=' overflow-y-auto h-fill absolute left-0'>
    {ChatList}
    </div>
           {/* Room:    <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input><br />
      Userid:  <input type="text" onChange={(event) => {setuserid(event.target.value)}}></input> */}
  <div className='absolute left-[300px]'>
  <Chat socket={socket} room={room} username={userid} />

  </div>


    </div>

  )
}

export default Room