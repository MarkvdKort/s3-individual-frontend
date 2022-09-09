import video from "./assets/gobert.mp4"
import { Link } from "react-router-dom"
const Video = () => {
    return(
        <video controls muted>
            <source src={video} type="video/mp4"></source>
        </video>
    )
}
export default Video