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
    const NameList = ["mark", "mark1"]
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
        <div className="text-xl font-medium text-black">Chat: {chat.id} <br /> with user {chat.user2ID}</div>
        </div>
      </button>   
       
    })
      function CreateNewChat(otheruserid) {
        Axios.post("https://localhost:7081/api/Chat", {
          user1id: userid,
          user2id: otheruserid
        })
      }
      const [value, setValue] = useState("");

      const onChange = (event) => {
        setValue(event.target.value);
      };
    
      const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // our api to fetch the search result
        console.log("search ", searchTerm);
      };

  return (
    
    <div>
      <Navbar />
      <div>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={() => onSearch(value)}> Search </button>
{NameList
        .filter((item) => {
          const searchTerm = value.toLowerCase();
          const id = "mark"
          return (
            searchTerm &&
            item.startsWith(searchTerm) &&
            item !== searchTerm
          );
        })
        .slice(0, 10)
        .map((item) => (
          <div
            onClick={() => onSearch(item.id)}
            className="dropdown-row"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
      <div className='overflow-y-auto h-fill absolute left-0'>
    {ChatList}

    </div>
      <button className='absolute bottom-0' onClick={() => CreateNewChat(1)}>
        Create New Chat
      </button>
           {/* Room:    <input type="text" onChange={(event) => {setRoom(event.target.value)}}></input><br />
      Userid:  <input type="text" onChange={(event) => {setuserid(event.target.value)}}></input> */}
  <div className='absolute left-[300px]'>
  <Chat socket={socket} room={room} username={userid} />

  </div>


    </div>

  )
}

export default Room