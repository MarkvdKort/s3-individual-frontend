import React, { useState } from "react";
import video from "./assets/gobert.mp4"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import  Axios  from "axios"
import { useAuth0 } from "@auth0/auth0-react";



const Video = () => {
    const {user} = useAuth0();
    const [userid, setuserid] = useState();

    const   AddToCurrentlyWatching = () => {
        // const {user} = useAuth0();
        // const [userid, setuserid] = useState();
        // Axios.get('https://localhost:7081/authid/' + user.sub).then((response) => {setuserid(response.data)});
        // Axios.post('https://localhost:7081/api/CurrentlyWatching', {
        //     "userID": (userid),
        //     "videoID": 1
        //   }.then(console.log("Video has been added to currently watching table")))
        
    }
    async function GetUserID(){
      try{
        const result = await Axios.get('https://localhost:7081/authid/' + user.sub);
        setuserid(result.data)
      }
      catch(Error){
        console.error(Error);
      }
    }

    GetUserID();

    function AddCurrentlyWatching() {
      Axios.get('https://localhost:7081/api/CurrentlyWatching/' + userid + ' 1').then((response) => {
        if(response.data === "")
          {
            Axios.post('https://localhost:7081/api/CurrentlyWatching', {
              userID: (userid),
              videoID: '1'
            })
          }else{
              console.log(response.data)
          }})
    }

    function AddToViewHistory() {
      Axios.delete('https://localhost:7081/api/CurrentlyWatching/' + userid + ' 1');
      Axios.get('https://localhost:7081/api/ViewHistory/' + userid + ' 1').then((response) =>{
        if(response.data === ""){
          Axios.post('https://localhost:7081/api/ViewHistory', {
            userID: (userid),
            videoID: '1'
          })
        }
      })

    }
    return(
      <div>

        <Navbar />
        <video 
        style={{alignItems: "Center"}}
        height="600px" 
        width="600px" 
        controls disablePictureInPicture 
        controlsList="nodownload" 
        id="video" 
        onEnded={() => {
          AddToViewHistory();
        }} 
        onPlaying={() => { 
          AddCurrentlyWatching();                      
          }}
          >
            <source src={video} type="video/mp4"></source>
            Video is not supported
          </video> 
      </div>
    )
    
}
export default Video