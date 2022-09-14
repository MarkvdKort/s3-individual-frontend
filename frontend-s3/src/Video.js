import video from "./assets/gobert.mp4"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Video = () => {

    return(
                <div>

<Navbar />
        <video style={{alignItems: "Center"}}height="600px" width="600px" controls disablePictureInPicture controlsList="nodownload" id="video" onEnded={() => console.log('video ended')} onPlaying={() => console.log('playing')}>
            <source src={video} type="video/mp4"></source>
            Video is not supported
        </video>
        </div>
    )
    
}
export default Video